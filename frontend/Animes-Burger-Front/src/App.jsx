import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cardapio from "./pages/Cardapio/index.jsx";
import Checkout from "./pages/Checkout/index.jsx";
import PedidoConfirmado from "./pages/PedidoConfirmado/index.jsx";
import Registro from "./pages/Resgistro/index.jsx";
import MinhaConta from "./pages/MinhaConta/index.jsx";
import MeusPedidos from "./pages/MeusPedidos/index.jsx";
import NossoEspaco from "./pages/NossoEspaco/index.jsx";

import PublicLayout from "./components/PublicLayout.jsx";
import { CartProvider } from "./pages/Carrinho/index.jsx";

import AdminLayout from './pages/Admin/AdminLayout.jsx';
import AdminDashboard from './pages/Admin/index.jsx';
import AdminProdutos from './pages/Admin/Produtos';
import AdminPedidos from './pages/Admin/Pedidos';
import AdminClientes from "./pages/Admin/Clientes/index.jsx";
import AdminCategorias from "./pages/Admin/Categorias/index.jsx";
import AdminDestaques from "./pages/Admin/Destaques/index.jsx";
import AdminRoute from './components/AdminRoute.jsx';

function AppRoutes() {
  return (

    <BrowserRouter>
      <CartProvider>
        <Routes>

          {/* rotas publicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedido-confirmado/:id" element={<PedidoConfirmado />} />
            <Route path="/meus-pedidos" element={<MeusPedidos />} />
            <Route path="/espaco" element={<NossoEspaco />} />
            <Route path="/conta" element={<MinhaConta />} />
          </Route>

          {/* rotas full screen */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          

          {/* rotas admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="produtos" element={<AdminProdutos />} />
              <Route path="pedidos" element={<AdminPedidos />} />
              <Route path="clientes" element={<AdminClientes />} />
              <Route path="categorias" element={<AdminCategorias />} />
              <Route path="destaques" element={<AdminDestaques />} />
            </Route>
          </Route>

        </Routes>
      </CartProvider>
    </BrowserRouter>

  );
}

export default AppRoutes;