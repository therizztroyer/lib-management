import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Header from "./Header";
import "../App.css";
import { Grid, ImageList, ImageListItem, Box } from "@mui/material";
import homeImages from "../Constants/imagesList";
import Register from "./Register";
import Login from "./Login";
function App() {
  
  let itemData = homeImages;
  let [haveAccount, setHaveAccount] = useState(false);
  let [userLoginStatus, setUserLoginStatus] = useState();
  let logout = () => {
    localStorage.clear();
    setUserLoginStatus(false);
  };
  return (
      <ThemeProvider theme={theme}>
        <Grid className="homeImgGradient" sx={{ backgroundColor: "gray" }}>
          <ImageList
            sx={{ width: "100%", height: "100%", marginTop: 0 }}
            variant="quilted"
            rowHeight={200}
          >
            {itemData.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Box className="centered">
            {!haveAccount && <Register setHaveAccount={setHaveAccount}/>}
            {haveAccount && <Login setUserLoginStatus={setUserLoginStatus} setHaveAccount={setHaveAccount} />}
          </Box>
        </Grid>
      </ThemeProvider>
  );
}

export default App;
