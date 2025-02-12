import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarUser from "./navbars/NavbarUser";

const Login = () => {
  const [form, setForm] = useState({ Email: "", password: "" });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const loginfunction = async () => {
    setMessage(""); // Clear previous messages

    if (!form.Email || !form.password) {
      setMessage("Please fill in all fields.");
      return; // Exit the function if fields are empty
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        form
      );
      const { role, name, blocked } = response.data.user;

      if (blocked === "yes") {
        setMessage("You are blocked from this site.");
        return; // Exit the function if the user is blocked
      }

      sessionStorage.setItem("logintoken", response.data.token);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      if (role === "uploader") {
        navigate("/uploaderhome", { state: { user: response.data.user } });
      } else if (role === "admin") {
        navigate("/viewerDetails", { state: { user: response.data.user } });
      } else if (role === "user") {
        navigate("/viewerhome", { state: { user: response.data.user } });
      }
    } catch (error) {
      setMessage("Invalid Email or Password");
    }
  };

  return (
    <>
      <div className="login">
        <NavbarUser />
          <Box
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              loginfunction();
            }
          }}
          className="box-signup d-flex flex-column p-5 rounded-2"
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <h3 className="fs-3 text-center">Log In</h3>
          <div>
            <br />
            <TextField
              required
              id="outlined-disabled"
              label="E-mail"
              type="email"
              onChange={(e) => {
                setForm({ ...form, Email: e.target.value });
              }}
            />
            <br />
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
              }}
            />
            <br />
          </div>
          {message && (
            <div className="message text-center text-danger">{message}</div>
          )}
          <Button variant="contained" onClick={loginfunction}>
            LOGIN
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Login;
