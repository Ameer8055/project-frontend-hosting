import React, { useState } from "react";
import "../assets/css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import NavbarUser from "./navbars/NavbarUser";
import axios from "axios";

const Signup = () => {
  const [error, setError] = useState("");
  const [signupform, setSignupform] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateName = (name) => {
    const regex = /^[A-Za-z]+$/; // Only letters and spaces
    return regex.test(name);
  };

  const signupfunction = async () => {
    if (!validateEmail(signupform.email)) {
      setError("Invalid email format");
      return;
    }
    if (!validateName(signupform.name)) {
      setError("Name can only contain letters");
      return;
    }

    try {
      axios
        .post("https://project-backend-hosting.vercel.app/user/create", signupform)
        .then((res) => {
          alert("Sign Up Success");
          navigate("/login");
        })
        .catch(() => {
          setError("Sign up error");
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <NavbarUser />
      <Box
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            signupfunction();
          }
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="mt-5"
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, width: "400px", borderRadius: 3, margin: 3 }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Create an Account
          </Typography>
          <FormControl fullWidth>
            <TextField
              required
              label="Name"
              variant="outlined"
              margin="normal"
              onChange={(e) => {
                setSignupform({ ...signupform, name: e.target.value });
              }}
            />
            <TextField
              required
              label="E-mail"
              type="email"
              variant="outlined"
              margin="normal"
              onChange={(e) => {
                setSignupform({ ...signupform, email: e.target.value });
              }}
            />
            <TextField
              required
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              onChange={(e) => {
                setSignupform({ ...signupform, password: e.target.value });
              }}
            />
            <FormLabel sx={{ marginTop: 2 }}>Are you a ?</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="Viewer"
                onClick={(e) => {
                  setSignupform({ ...signupform, role: e.target.value });
                }}
              />
              <FormControlLabel
                value="uploader"
                control={<Radio />}
                label="Uploader"
                onClick={(e) => {
                  setSignupform({ ...signupform, role: e.target.value });
                }}
              />
            </RadioGroup>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 3, padding: 1 }}
              onClick={signupfunction}
            >
              SIGNUP
            </Button>
            <h4 className="text-danger text-center mt-3">{error}</h4>
          </FormControl>
        </Paper>
      </Box>
    </>
  );
};

export default Signup;
