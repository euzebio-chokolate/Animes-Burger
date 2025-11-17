import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";


import AdminLayout from './pages/Admin/AdminLayout.jsx';
import AdminDashboard from './Pages/Admin/index.jsx'; 
import AdminProdutos from './pages/Admin/Produtos'; 
import AdminPedidos from './pages/Admin/Pedidos'; 

import AdminRoute from './components/AdminRoute';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
    
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
           
            <Route index element={<AdminDashboard />} /> 
            <Route path="produtos" element={<AdminProdutos />} />
            <Route path="pedidos" element={<AdminPedidos />} />
          
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
