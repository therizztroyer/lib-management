import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./UserDrawer";
import axios from "axios";
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
import {Alert} from "@mui/material";

function RequestBook() {
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
  let [searchedBooks, setSearchedBooks] = useState([]);
  let [message, setMessage] = useState();
  let [openNotification, setOpenNotification] = useState(false);
  let userInfo = JSON.parse(localStorage.getItem("user"));
    let {rollno} = userInfo;
  let handleRequestBook = async (isbn) => {
    let reqObj = {
        isbn,
        rollno,
        status:"pending",
        requestDate: new Date(),
        updateRequestDate: new Date()
    };
    axios.defaults.baseURL = 'http://localhost:8080';
    let response = await axios.post("request/createRequest", reqObj);
    if(response.status === 200){
        setMessage("Book Requested!!");
        setOpenNotification(true);
    }
  }
  let handleSearchBook = async (e) => {
    let searchText = e.target.value;
    axios.defaults.baseURL = 'http://localhost:8080';
    let booksFound = await axios.get("books/searchBook", {
      params: { searchText: searchText },
    });
    setSearchedBooks(booksFound?.data?.response);
  };

  return (
    <>
      <ResponsiveDrawer>
      {openNotification && (
        <Alert
          onClose={() => setOpenNotification(false)}
          severity="success"
          sx={{ width: "90%", margin: "20px" }}
        >
          {message}
        </Alert>
      )}
        <h1>Request Book</h1>
        <TextField
          className="textfield"
          id="Search"
          label="Search book by name, author or isbn..."
          variant="filled"
          sx={{ label: { color: "black" } }}
          onChange={handleSearchBook}
        />
        {searchedBooks?.length > 0 && (
          <TableContainer component={Paper} sx={{marginTop: "30px"}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ISBN NUMBER</StyledTableCell>
                  <StyledTableCell align="center">BOOK NAME</StyledTableCell>
                  <StyledTableCell align="center">AUTHOR</StyledTableCell>
                  <StyledTableCell align="center">SUBJECT</StyledTableCell>
                  <StyledTableCell align="center">TOTAL QTY</StyledTableCell>
                  <StyledTableCell align="center">ACTION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedBooks.map((book) => (
                  <StyledTableRow key={book.isbn}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {book.isbn}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {book.bookname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {book.author}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {book.subject}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {book.totalqty}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="filled" onClick={() => handleRequestBook(book.isbn)} sx={{backgroundColor:"blue", color:"white", border:"1px solid white"}}>
                        Request
                      </Button>
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

export default RequestBook;
