import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Divider,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Alert,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import axios from "axios";
import {validateEmail, validatePhone} from "./Util";

function Register(props) {
  let [openNotification, setOpenNotification] = useState(false);
  let [showPassword, setShowPassword] = useState(false);
  let [formData, setFormData] = useState({
    name: "",
    rollno: "",
    type: "user",
    email: "",
    password: "",
    phonenumber: "",
    issuedBooks: [],
  });
  let [message, setMessage] = useState("");
  let handleOnchange = (type, value) => {
    setFormData((state) => {
      return { ...state, [`${type}`]: value };
    });
  };
  let handleLogin = () => {
    props.setHaveAccount(true);
  };
  let handleRegister = async () => {
    console.log("validateEmail", validateEmail(formData.email));
    if(!validateEmail(formData.email)){
        setMessage({
            text: "Please enter valid email",
            severity: 'error'
        });
        setOpenNotification(true);
        return;
    }
    else if(!validatePhone(formData.phonenumber)){
        setMessage({
            text: "Please enter valid Phone Number",
            severity: 'error'
        });
        setOpenNotification(true);
        return;
    }
    console.log("formData", formData);
    let res = await axios.post("user/createUser",formData);
    props.setHaveAccount(true);
  };
  return (
    <Box className="RegisterBox" container>
      {openNotification && (
        <Alert
          onClose={() => setOpenNotification(false)}
          severity={message.severity}
          sx={{ width: "90%", margin: "20px" }}
        >
          {message.text}
        </Alert>
      )}
      <Grid className="title" mb={2}>
        <Typography>Set up your LNMIIT Library Account</Typography>
      </Grid>
      <Grid>
        <Grid container sx={{ display: "flex", flexDirection: "column" }}>
          <Grid item={true} mb={4} sx={{ display: "flex" }}>
            <Grid item={true} md={6} mr={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Name
              </Typography>
              <TextField
                className="textfield"
                id="email"
                label="Enter your Name"
                variant="filled"
                sx={{ label: { color: "black" } }}
                onChange={(e) => handleOnchange("name", e.target.value)}
                value={formData.name}
              />
            </Grid>
            <Grid item={true} md={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Email
              </Typography>
              <TextField
                className="textfield"
                id="email"
                label="Enter your email"
                variant="filled"
                sx={{ label: { color: "black" } }}
                onChange={(e) => handleOnchange("email", e.target.value)}
                value={formData.email}
              />
            </Grid>
          </Grid>
          <Grid item={true} mb={4} sx={{ display: "flex" }}>
            <Grid item={true} md={6} mr={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Roll No/ Employee Id
              </Typography>
              <TextField
                className="textfield"
                id="rollno"
                label="Enter your Roll No"
                variant="filled"
                sx={{ label: { color: "black" } }}
                onChange={(e) => handleOnchange("rollno", e.target.value)}
                value={formData.rollno}
              />
            </Grid>
            <Grid item={true} md={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Phone Number
              </Typography>
              <TextField
                className="textfield"
                id="phonenumber"
                label="Enter your Phone Number"
                variant="filled"
                sx={{ label: { color: "black" } }}
                onChange={(e) => handleOnchange("phonenumber", e.target.value)}
                value={formData.phonenumber}
              />
            </Grid>
          </Grid>
          <Grid item={true} mb={4} sx={{ display: "flex" }}>
            <Grid item={true} md={6} mr={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Password
              </Typography>
              <TextField
                className="textfield"
                type={showPassword? 'text' : 'password'}
                id="password"
                label="Enter the Password"
                variant="filled"
                sx={{ label: { color: "black" } }}
                onChange={(e) => handleOnchange("password", e.target.value)}
                value={formData.password}
                InputProps = {{ endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((state) => !state)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  
                }}
              />
            </Grid>
            <Grid item={true} md={6}>
              <FormControl>
                <FormLabel
                  id="UserTypeRadio"
                  sx={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
                >
                  User Type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="UserTypeRadio"
                  name="radio-buttons-group"
                  onChange={(e) => handleOnchange("type", e.target.value)}
                  value={formData.type}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="staff"
                    control={<Radio />}
                    label="Staff"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        mb={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="contained"

          sx={{ marginTop: "20px", width: "40%" }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Grid>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs>
          <Divider />
        </Grid>
        <Grid item sx={{ fontWeight: "bold" }}>
          Already have an account?
        </Grid>
        <Grid item xs>
          <Divider />
        </Grid>
      </Grid>
      <Grid
        container
        mb={3}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          sx={{ marginTop: "20px", width: "40%" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Grid>
    </Box>
  );
}

export default Register;
