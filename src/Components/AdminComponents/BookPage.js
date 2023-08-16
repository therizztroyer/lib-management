import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";

function BookPage(props) {
  let { title, type, bookData, open, handleCancel } = props;
  axios.defaults.baseURL = "http://localhost:8080";
  let [formData, setFormData] = useState({
    bookname: "",
    isbn: "",
    author: "",
    subject: "",
    totalqty: 0,
  });

  let handleOnchange = (field, value) => {
    setFormData((d) => {
      return { ...d, [`${field}`]: value };
    });
  };

  useEffect(() => {
    if (type === "edit") setFormData(bookData);
  }, []);

  let handleSubmit = async () => {
    if (type === "edit") {
      await axios.put("books/updateBook", { ...formData });
    } else {
      await axios.post("books/addBook", { ...formData });
    }
    handleCancel();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="centered"
          sx={{
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid black",
            borderRadius: "10px",
          }}
        >
          <Typography id="modal-modal-title" variant="h2" component="h2" mb={3}>
            {title}
          </Typography>
          <Grid>
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item={true} mb={4} sx={{ display: "flex" }}>
                <Grid item={true} md={6} mr={3}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    BOOK NAME
                  </Typography>
                  <TextField
                    className="textfield"
                    id="book name"
                    label="Enter Book Name"
                    variant="filled"
                    sx={{ label: { color: "black" } }}
                    onChange={(e) => handleOnchange("bookname", e.target.value)}
                    value={formData.bookname}
                  />
                </Grid>
                <Grid item={true} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    AUTHOR
                  </Typography>
                  <TextField
                    className="textfield"
                    id="authhor"
                    label="Enter Author Name"
                    variant="filled"
                    sx={{ label: { color: "black" } }}
                    onChange={(e) => handleOnchange("author", e.target.value)}
                    value={formData.author}
                  />
                </Grid>
              </Grid>
              <Grid item={true} mb={4} sx={{ display: "flex" }}>
                <Grid item={true} md={6} mr={3}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    ISBN Number
                  </Typography>
                  <TextField
                    className="textfield"
                    id="isbn"
                    label="Enter ISBN Number"
                    variant="filled"
                    sx={{ label: { color: "black" } }}
                    onChange={(e) => handleOnchange("isbn", e.target.value)}
                    value={formData.isbn}
                  />
                </Grid>
                <Grid item={true} md={6}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    SUBJECT
                  </Typography>
                  <TextField
                    className="textfield"
                    id="subject"
                    label="Enter your subject"
                    variant="filled"
                    sx={{ label: { color: "black" } }}
                    onChange={(e) => handleOnchange("subject", e.target.value)}
                    value={formData.subject}
                  />
                </Grid>
              </Grid>
              <Grid item={true} md={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  TOTAL AVAILABLE QUANTITY
                </Typography>
                <TextField
                  className="textfield"
                  id="totalQty"
                  label="Enter total available quantity"
                  variant="filled"
                  sx={{ label: { color: "black" } }}
                  onChange={(e) => handleOnchange("totalqty", e.target.value)}
                  value={formData.totalqty}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ marginTop: "10px" }}>
            <Button
              variant="filled"
              sx={{
                backgroundColor: "green",
                color: "white",
                marginRight: "10px",
              }}
              onClick={handleSubmit}
            >
              {type === "edit" ? "SAVE" : "ADD"}
            </Button>
            <Button
              variant="filled"
              sx={{ backgroundColor: "gray" }}
              onClick={handleCancel}
            >
              CANCEL
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default BookPage;
