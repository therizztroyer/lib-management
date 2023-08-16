import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./UserDrawer";
import NoDataFound from "../NoDataFound";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {Alert} from "@mui/material";

function RequestsSection() {
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  let [userRequests, setUserRequests] = useState([]);
  let [message, setMessage] = useState("");
  let [openNotification,setOpenNotification] = useState(false);
  let [requestMade, setRequestMade] = useState(false);

  useEffect(() => {
    (async () => {
    let userInfo = JSON.parse(localStorage.getItem("user"));
    let {rollno} = userInfo;
    axios.defaults.baseURL = 'http://localhost:8080';
    let requestDetails = await axios.get("request/searchRequest",{params:{
      rollno: rollno,
      status: "pending"
    }});
    console.log("requests", requestDetails);
    setUserRequests(requestDetails?.data?.response);
  })();
  },[requestMade]);

  let handleCancelRequest = async (data) => {
    console.log("reqId",data);
    axios.defaults.baseURL = 'http://localhost:8080';
    let res = await axios.put("request/updateRequestStatus",{
      reqId:data._id,
      status: "deleted"
    });
    if(res.status === 200){
      setMessage("Request Deleted!");
      setOpenNotification(true);
      window.location.reload();
    }
  };

  return (
    <>
      <ResponsiveDrawer>
      {openNotification && (
        <Alert
          onClose={() => setOpenNotification(false)}
          severity="error"
          sx={{ width: "90%", margin: "20px" }}
        >
          {message}
        </Alert>
      )}
        <h1>Your Pending Requests</h1>
        {userRequests.length === 0 && <NoDataFound></NoDataFound>}
        {userRequests?.length > 0 && (
          <>
            <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      ISBN NUMBER
                    </StyledTableCell>
                    <StyledTableCell align="center">BOOK NAME</StyledTableCell>
                    <StyledTableCell align="center">AUTHOR</StyledTableCell>
                    <StyledTableCell align="center">REQUEST DATE</StyledTableCell>
                    <StyledTableCell align="center">ACTION</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userRequests.map((data) => (
                    <StyledTableRow key={data.isbn}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {data.isbn}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.bookDetails.bookname}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.bookDetails.bookname}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(data.requestDate).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="filled"
                          sx={{
                            backgroundColor: "blue",
                            color: "white",
                            border: "1px solid white",
                          }}
                          onClick={() => handleCancelRequest(data)}
                        >
                          Cancel Request
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </ResponsiveDrawer>
    </>
  );
}

export default RequestsSection;
