import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "./UserDrawer";
import {
  Typography,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EditModal from "../EditModal";

function ProfilePage() {
  let userInfo = JSON.parse(localStorage.getItem("user"));
  let usertype = userInfo.type
  let [editModalProps, setEditModalProps] = useState();
  axios.defaults.baseURL = 'http://localhost:8080';
  let [openModal, setOpenModal] = useState();
  let handleSubmit = async (field, newVal) => {
    await axios.put("/user/updateField", {
      type: field,
      newVal: newVal,
      rollno: userInfo.rollno
    });
    localStorage.setItem("user", JSON.stringify({...userInfo,[`${field}`]: newVal}));
    setOpenModal(false);
  };
  let handleFieldChange = (field) => {
    setOpenModal(true);
    if (field === "name") {
      setEditModalProps({
        title: "Change your Name",
        currentValue: userInfo.name,
        textFieldPlaceholder: "Enter new name...",
        onSubmit: handleSubmit,
        open: openModal,
        handleCancel: () => setOpenModal(false),
        field,
      });
    } else if (field === "email") {
      setEditModalProps({
        title: "Change your email",
        currentValue: userInfo.email,
        textFieldPlaceholder: "Enter new email...",
        onSubmit: handleSubmit,
        open: openModal,
        handleCancel: () => setOpenModal(false),
        field,
      });
    } else if (field === "phonenumber") {
      setEditModalProps({
        title: "Change your Contact Number",
        field,
        currentValue: userInfo.phonenumber,
        textFieldPlaceholder: "Enter new Contact Number...",
        onSubmit: handleSubmit,
        open: openModal,
        handleCancel: () => setOpenModal(false),
      });
    }
  };
  return (
    <Grid>
      {openModal && <EditModal 
        {...editModalProps}
      />}
      <ResponsiveDrawer>
        <Grid container sx={{ width: "50%" }}>
          <h1>Hi {userInfo.name} !</h1>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "100px",
                    }}
                  >
                    NAME{" "}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "gray",
                      fontWeight: "bold",
                      borderRadius: "100px",
                    }}
                  >
                    {userInfo.name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleFieldChange("name")}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "100px",
                    }}
                  >
                    {usertype === "student" ? "Roll No" : "EMPLOYEE ID" }
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "gray",
                      fontWeight: "bold",
                      borderRadius: "100px",
                    }}
                  >
                    {userInfo.rollno}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "100px",
                    }}
                  >
                    Email Id
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "gray",
                      fontWeight: "bold",
                      borderRadius: "100px",
                    }}
                  >
                    {userInfo.email}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleFieldChange("email")}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "100px",
                    }}
                  >
                    Phone Number
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "gray",
                      fontWeight: "bold",
                      borderRadius: "100px",
                    }}
                  >
                    {userInfo.phonenumber}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleFieldChange("phonenumber")}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "100px",
                    }}
                  >
                    User Type
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="h6"
                    sx={{
                      backgroundColor: "gray",
                      fontWeight: "bold",
                      borderRadius: "100px",
                    }}
                  >
                    {userInfo.type}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </ResponsiveDrawer>
    </Grid>
  );
}

export default ProfilePage;
