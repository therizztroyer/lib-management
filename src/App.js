import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Header from './Components/Header';
import UserDashboard from "./Components/UserComponents/UserDashboard";
import BooksIssued from "./Components/UserComponents/BooksIssued";
import RequestsSection from "./Components/UserComponents/RequestsSection";
import UserProfilePage from "./Components/UserComponents/ProfilePage";
import RequestBook from "./Components/UserComponents/RequestBook";
import AdminDashboard from "./Components/AdminComponents/AdminDashboard";
import AdminRequestSection from "./Components/AdminComponents/RequestSection";
import BooksSection from "./Components/AdminComponents/BooksSection";
import BookPage from "./Components/AdminComponents/BookPage";
import UserSection from "./Components/AdminComponents/UserSection";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="user/issuedBooks" element={<BooksIssued />} />
            <Route path="user/requests" element={<RequestsSection />} />
            <Route path="user/profile" element={<UserProfilePage />} />
            <Route path="user/requestBook" element={<RequestBook />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
            <Route path="admin/requestSection" element={<AdminRequestSection />} />
            <Route path="admin/userSection" element={<UserSection />} />
            <Route path="admin/bookSection" element={<BooksSection />} />
            <Route path="admin/bookPatge" element={<BookPage/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
