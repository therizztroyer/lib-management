import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./UserDrawer";
import NoDataFound from "../NoDataFound";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function BooksIssued() {
  axios.defaults.baseURL = 'http://localhost:8080';
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

  let [issuedBooks, setIssuedBooks] = useState([]);
  useEffect(() => {
    (async () => {
      let userInfo = JSON.parse(localStorage.getItem("user"));
      let { rollno } = userInfo;
      let res = await axios.get("request/searchRequest", {
        params: {
          rollno: rollno,
          status: "approved",
        },
      });
      setIssuedBooks(res?.data?.response);
    })();
  }, []);
  return (
    <>
      <ResponsiveDrawer>
        <h1>Books Issued to you</h1>
        {!issuedBooks || issuedBooks.length === 0 && <NoDataFound></NoDataFound>}
        {issuedBooks?.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ISBN NUMBER</StyledTableCell>
                  <StyledTableCell align="center">BOOK NAME</StyledTableCell>
                  <StyledTableCell align="center">AUTHOR</StyledTableCell>
                  <StyledTableCell align="center">SUBJECT</StyledTableCell>
                  <StyledTableCell align="center">TOTAL QTY</StyledTableCell>
                  <StyledTableCell align="center">ISSUE DATE</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {issuedBooks.map((data) => (
                  <StyledTableRow key={data.bookDetails.isbn}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {data.bookDetails.isbn}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.bookDetails.bookname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.bookDetails.author}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.bookDetails.subject}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {data.bookDetails.totalqty}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(data.updateRequestDate).toLocaleDateString()}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </ResponsiveDrawer>
    </>
  );
}

export default BooksIssued;
