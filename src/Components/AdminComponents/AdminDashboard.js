import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "./AdminDrawer";
import { Box } from "@mui/material";
import axios from "axios";

function AdminDashboard(props) {
  let [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      axios.defaults.baseURL = "http://localhost:8080";
      let data = await axios.get("user/getDashboardInfo");
      setData(data?.data?.response);
    })();
  }, []);
  return (
    <>
      <ResponsiveDrawer>
        {data && (
          <>
            <Box
              sx={{
                backgroundColor: "blue",
                color: "white",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px",
                width: "40%",
                marginBottom: "10px",
              }}
            >
              TOTAL PENDING REQUESTS - {data.totalRequests}
            </Box>
            <Box
              sx={{
                backgroundColor: "blue",
                color: "white",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px",
                width: "40%",
                marginBottom: "10px",
              }}
            >
              AVAILABLE BOOKS - {data.totalBooks}
            </Box>
            <Box
              sx={{
                backgroundColor: "blue",
                color: "white",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px",
                width: "40%",
                marginBottom: "10px",
              }}
            >
              TOTAL STUDENTS - {data.totalStudents}
            </Box>
            <Box
              sx={{
                backgroundColor: "blue",
                color: "white",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px",
                width: "40%",
                marginBottom: "10px",
              }}
            >
              STAFF MEMBERS - {data.totalStaff}
            </Box>
          </>
        )}
      </ResponsiveDrawer>
    </>
  );
}

export default AdminDashboard;
