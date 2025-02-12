import React from "react";
import axios from "axios";
import axiosInstance from "../../axiosInterceptor";
import { Await, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "./ViewerPayment.css";
import VideodisplayNavbar from "../navbars/VideodisplayNavbar";
const ViewerPayment = () => {
  const navigate = useNavigate();
  const handlePayment = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user._id;
    try {
      // Create an order
      const { data } = await axiosInstance.post(
        "https://project-backend-hosting.onrender.com/Payment/create-order",
        { amount: 100, userId }
      );

      const options = {
        key: "rzp_test_gcno01jWHPtXTK",
        amount: data.order.amount,
        currency: "INR",
        name: "Cinestream",
        description: "Premium Subscription",
        order_id: data.order.id,
        handler: async function (response) {
          console.log(response);
          // Verify Payment
          const verifyRes = await axiosInstance.post(
            "https://project-backend-hosting.onrender.com/Payment/paymentVerification",
            response
          );
          if (verifyRes.data.success) {
            const update = await axiosInstance.put(
              `https://project-backend-hosting.onrender.com/user/update-subscription/${userId}`,
              { subscription: "premium" }
            );
            user.subscription = "premium";
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/viewerhome");
          } else {
            alert("Payment Failed!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9685638539",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in payment: ", error);
    }
  };

  const plan = {
    name: "Lifetime Plan",
    price: "₹100 one-time",
    features: [
      "Unlimited User Access",
      "4K Streaming",
      "Unlimited Movies",
      "Lifetime Access",
    ],
    buttonText: "Choose Lifetime",
    variant: "warning",
  };

  return (
    <div>
      <VideodisplayNavbar />
      <div className="container mx-auto py-10 text-center d-flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-6 text-white">Premium Plan</h3>
        <div className="payment-card flex justify-center">
          <div className="bg-white p-6 shadow-lg rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-gray-500 mb-4">{plan.price}</p>
            <ul className="mb-4 text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="text-green-500" size={18} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition"
              onClick={handlePayment}
            >
              {plan.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerPayment;
