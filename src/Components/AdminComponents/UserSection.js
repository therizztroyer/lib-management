import React, { useState, useEffect } from "react";
import ResponsiveDrawer from "./AdminDrawer";
import NoDataFound from "../NoDataFound";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField} from "@mui/material";

function UserSection() {
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
  let [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      let users = await axios.get("user/getUsers");
      setUsers(users?.data?.response);
    })();
  }, []);

  let handleSearchUser = async (e) => {
    let res = await axios.get("user/searchUser",{params:{
      searchTxt: e.target.value
    }});
    setUsers(res?.data?.response);
  }

  return (
    <ResponsiveDrawer>
      <h1>USERS SECTION</h1>
      {users.length === 0 && <NoDataFound></NoDataFound>}
      {users?.length > 0 && (
        <>
        <TextField
          className="textfield"
          id="Search"
          label="Search user by name or roll no"
          variant="filled"
          sx={{ label: { color: "black" } }}
          onChange={handleSearchUser}
        />
       
        <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">USERNAME</StyledTableCell>
                <StyledTableCell align="center">EMAIL ID</StyledTableCell>
                <StyledTableCell align="center">PHONE NUMBER</StyledTableCell>
                <StyledTableCell align="center">ROLL NUMBER</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((data) => (
                <StyledTableRow key={data.rollno}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {data.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{data.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {data.phonenumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.rollno}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
      )}
    </ResponsiveDrawer>
  );
}

export default UserSection;
