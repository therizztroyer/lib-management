import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveDrawer from "./AdminDrawer";
import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import BookPage from "./BookPage";
import { Alert } from "@mui/material";
function BooksSection() {
  let [searchedBooks, setSearchedBooks] = useState([]);
  let [selectedBookData, setSelectedBookData] = useState(null);
  let [operationType, setOperationType] = useState("");
  let [title, setTitle] = useState("");
  let [message, setMessage] = useState();
  let [openNotification, setOpenNotification] = useState(false);
  let [openModal, setOpenModal] = useState(false);
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

  let handleSearchBook = async (e) => {
    let searchText = e.target.value;
    axios.defaults.baseURL = "http://localhost:8080";
    let booksFound = await axios.get("books/searchBook", {
      params: { searchText: searchText },
    });
    setSearchedBooks(booksFound?.data?.response);
  };

  let handleEdit = (data) => {
    setSelectedBookData(data);
    setOperationType("edit");
    setTitle("Edit Book");
    setSearchedBooks([]);
    setOpenModal(true);
  };

  let handleAddNewBook = () => {
    setOperationType("add");
    setTitle("Add Book");
    setOpenModal(true);
  };

  let handleDelete = async(isbn) => {
     await axios.delete("books/deleteBook", {params:{reqIsbn:isbn}});
     setSearchedBooks([]);
  };

  return (
    <>
      <ResponsiveDrawer>
        {openModal && (
          <BookPage
            title={title}
            type={operationType}
            bookData={selectedBookData}
            open={openModal}
            handleCancel={() => setOpenModal(false)}
          />
        )}
        <h1>Books Section</h1>
        <TextField
          className="textfield"
          id="Search"
          label="Search book by name, author or isbn..."
          variant="filled"
          sx={{ label: { color: "black" } }}
          onChange={handleSearchBook}
        />
        <Button
          variant="filled"
          onClick={handleAddNewBook}
          sx={{
            backgroundColor: "blue",
            color: "white",
            width: "40%",
            marginTop: "20px",
            marginLeft: "2px",
            padding: "10px",
          }}
        >
          Add a new Book
        </Button>
        {searchedBooks?.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
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
                      <Button
                        variant="filled"
                        onClick={() => handleEdit(book)}
                        sx={{
                          backgroundColor: "blue",
                          color: "white",
                          border: "1px solid white",
                        }}
                      >
                        Edit
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

export default BooksSection;
