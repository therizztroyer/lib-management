import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "./UserDrawer";
import { Box } from "@mui/material";
import axios from "axios";

function UserDashboard() {
  axios.defaults.baseURL = "http://localhost:8080";
  let [data, setData] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("user"));
  let usertype = userInfo.type;
  useEffect(() => {
    (async () => {
      let data = await axios.get("user/getUserDashboardInfo",{params:{
        rollno: userInfo.rollno
      }});
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
                marginBottom: "10px",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px",
                width: "40%",
                textAlign: "center",
              }}
            >
              <h5>TOTAL BOOKS ISSUED - {data.totalIssuedBooks}</h5>
            </Box>
            {usertype === "student" && <Box
              sx={{
                backgroundColor: "blue",
                color: "white",
                border: "1px solid black",
                borderRadius: "100px",
                padding: "10px",
                width: "40%",
                textAlign: "center",
              }}
            >
              <h5>TOTAL FINE -{data.totalFine} </h5>
            </Box>}
          </>
        )}
      </ResponsiveDrawer>
    </>
  );
}

export default UserDashboard;
