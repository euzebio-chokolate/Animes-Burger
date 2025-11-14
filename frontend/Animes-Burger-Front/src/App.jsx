import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";


function PrivateRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") return <Navigate to="/login" />;
  return children;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={() => window.location.replace('/admin')} />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
