import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import MyBooks from "./pages/MyBooks";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      {isLoggedIn ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-books" element={<MyBooks />} />
          </Routes>
        </>
      ) : (
        <Routes>

          <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
