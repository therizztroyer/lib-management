import React, {useState} from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Divider,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel
} from "@mui/material";
import { Visibility,VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [credentials, setCredentials] = useState({
    username: "",
    password: "",
    type: ""
  });
  const onFormSubmit = () => {
    console.log(credentials);
    //make post request to pass the credentials to the server api
    axios.post(`/user/login`, credentials).then((res) => {
      //get res object
      //data is the key in axios res obj
      let resObj = res.data;
      if (resObj.message === "login-success") {
        //save token to local storage
        localStorage.setItem("token", resObj.token);
        //we are passing the username even if we are passing the userobj because
        localStorage.setItem("username", resObj.username);
        localStorage.setItem("usertype", credentials.type);
        localStorage.setItem("user", JSON.stringify(resObj.userObj));

        props.setUserLoginStatus(true);
        if (credentials.type === "staff" || credentials.type === "student") {
          //navigate to userprofile dashboard
          navigate(`user/dashboard`);
        }
        if (credentials.type === "admin") {
          //navigate to admin dashboard
          navigate(`admin/dashboard`);
        }
      } else {
        alert(resObj.message);
      }
    });
  };
  const handleRegister = () => {
    props.setHaveAccount(false);
  };
  return (
    <Box className="LoginBox centered" container>
      <h1>Login</h1>
      <Grid item={true} mb={4}>
        <Grid item={true}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Email
          </Typography>
          <TextField
            className="textfield"
            id="email"
            label="Enter your email"
            variant="filled"
            sx={{ label: { color: "black" } }}
            onChange={(e) => setCredentials((st) => {return {...st, username: e.target.value}})}
            value={credentials.username}
          />
        </Grid>
        <Grid item={true}>
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
            onChange={(e) => setCredentials((st) => {return {...st, password: e.target.value}})}
            value={credentials.password}
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
          <Grid item={true}>
              <FormControl sx={{display:"flex"}}>
                <FormLabel
                  id="UserTypeRadio"
                >
                  Select User Type
                </FormLabel>
                <RadioGroup
                  aria-labelledby="UserTypeRadio"
                  name="radio-buttons-group"
                  onChange={(e) => setCredentials((st) => {return {...st, type: e.target.value}})}
                  value={credentials.type}
                  sx={{display:"flex"}}
                  
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio sx={{ color: "black", fontWeight: "bold"}}/>}
                    label="Student"
                    sx={{ color: "black", fontWeight: "bold", fontSize: "20px", backgroundColor:"white", margin:"3px", borderRadius: "100px", padding: "5px"}}
                  />
                  <FormControlLabel
                    value="staff"
                    control={<Radio sx={{ color: "black", fontWeight: "bold"}} />}
                    label="Staff"
                    sx={{ color: "black", fontWeight: "bold", fontSize: "20px", backgroundColor:"white", margin:"3px", borderRadius: "100px", padding: "5px" }}
                  />
                  <FormControlLabel
                    value="admin"
                    control={<Radio sx={{ color: "black", fontWeight: "bold"}} />}
                    label="Admin"
                    sx={{ color: "black", fontWeight: "bold", fontSize: "20px", backgroundColor:"white", margin:"3px", borderRadius: "100px", padding: "5px" }}
                  />
                </RadioGroup>
              </FormControl>
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
          onClick={onFormSubmit}
        >
          Login
        </Button>
      </Grid>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs>
          <Divider />
        </Grid>
        <Grid item sx={{ fontWeight: "bold" }}>
          Do not have an Account?
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
          onClick={handleRegister}
        >
          Register
        </Button>
      </Grid>
    </Box>
  );
}

export default Login;
