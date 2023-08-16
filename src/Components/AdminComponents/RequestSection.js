import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "./AdminDrawer";
import NoDataFound from "../NoDataFound";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, TextField, Box, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {FormControl} from "@mui/material";
import {InputLabel} from "@mui/material";
import {Select} from "@mui/material";
import {MenuItem} from "@mui/material";
import { Alert } from "@mui/material";

function RequestSection() {
  axios.defaults.baseURL = "http://localhost:8080";
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
  let [Requests, setRequests] = useState([]);
  let [status, setStatus] = useState();
  let [rollno, setRollNo] = useState("");
  let [requestMade, setRequestMade] = useState();
  let [openNotification, setOpenNotification] = useState(false);
  let [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      let res = await axios.get("request/getAllRequests");
      setRequests(res?.data?.response);
    })();
  }, [requestMade]);
  let handleIssueBook = async (data) => {
    // udpate request status
    let res = await axios.post("/request/issueBook", {
      reqId: data._id,
      isbn: data.isbn,
      newQty: parseInt(data.bookDetails.totalqty) - 1,
    });
    if (res.status === 200) {
      setMessage(res?.data?.message);
      setRequestMade((st) => !st);
    }
  };
  let handleRejectRequest = async (data) => {
    // udpate request status
    let res = await axios.post("request/rejectRequest", {
      reqId: data._id,
    });
    if (res.status === 200) {
      setMessage(res?.data?.message);
      setRequestMade((st) => !st);
    }
  };
  let handleUnissueBook = async (data) => {
    let res = await axios.post("/request/unissueBook", {
      reqId: data._id,
      isbn: data.isbn,
      newQty: parseInt(data.bookDetails.totalqty) + 1,
    });

    if (res.status === 200) {
      setMessage(res?.data?.message);
      setRequestMade((st) => !st);
    }
  };

  let handleSearchByFilter = async () => {
    let res = await axios.get("request/searchRequest",{params:{
        rollno: rollno,
        status: status
      }} );
    if(res.status === 200){
        setRequests(res?.data?.response);
    }
    
  }

  return (
    <ResponsiveDrawer>
      <h1>Request Section</h1>
      
      <Box>
        <Grid display="flex">
          <Grid item={true}>
            <TextField
              className="textfield"
              id="Search"
              label="Search by roll no and Request Status"
              variant="filled"
              sx={{ label: { color: "black" } , minWidth:400}}
              value={rollno}
              onChange={(e) => setRollNo(e.target.value)}
            />
          </Grid>
          <Grid item={true} ml={3}>
            <FormControl style={{minWidth: 200}}>
              <InputLabel id="demo-simple-select-label">Select Status Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Select the Status"
                onChange={(e) => setStatus(e.target.value)}
                sx={{background:"blue",color:"white"}}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="returned">Returned</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="deleted">Deleted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button variant="filled" sx={{backgroundColor:"blue", color:"white", marginLeft:"20px"}} onClick={handleSearchByFilter}>Search</Button>
        </Grid>
      </Box>
      {Requests.length === 0 && <NoDataFound sx={{ marginTop: "30px" }}></NoDataFound>}
      {Requests?.length > 0 && (
        <Grid>
          <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ISBN NUMBER</StyledTableCell>
                  <StyledTableCell align="center">BOOK NAME</StyledTableCell>
                  <StyledTableCell align="center">REQUEST DATE</StyledTableCell>
                  <StyledTableCell align="center">ROLL NO</StyledTableCell>
                  <StyledTableCell align="center">STATUS</StyledTableCell>
                  <StyledTableCell align="center">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Requests.map((data) => (
                  <StyledTableRow key={data.isbn}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {data.isbn}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.bookDetails.bookname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(data.requestDate).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.rollno}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.status === "pending" && (
                        <Button
                          variant="filled"
                          sx={{
                            backgroundColor: "green",
                            color: "white",
                            border: "1px solid white",
                          }}
                          onClick={() => handleIssueBook(data)}
                        >
                          Issue
                        </Button>
                      )}
                      {data.status === "pending" && (
                        <Button
                          variant="filled"
                          sx={{
                            backgroundColor: "red",
                            color: "white",
                            border: "1px solid white",
                          }}
                          onClick={() => handleRejectRequest(data)}
                        >
                          Reject
                        </Button>
                      )}
                      {data.status === "approved" && (
                        <Button
                          variant="filled"
                          sx={{
                            backgroundColor: "blue",
                            color: "white",
                            border: "1px solid white",
                          }}
                          onClick={() => handleUnissueBook(data)}
                        >
                          Unissue
                        </Button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </ResponsiveDrawer>
  );
}

export default RequestSection;
