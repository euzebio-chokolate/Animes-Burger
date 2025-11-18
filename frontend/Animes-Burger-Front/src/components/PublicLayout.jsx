import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; //
import CartSidebar from './CartSidebar';

const PublicLayout = () => {
  return (
    <div>
      <Navbar />
      <CartSidebar />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;