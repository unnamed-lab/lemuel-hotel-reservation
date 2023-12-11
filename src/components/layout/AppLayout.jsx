import { Outlet } from "react-router-dom";
import Navbar from "./Navigation";
import Footer from "./Footer";
import { useState } from "react";

function AppLayout() {
  const [navType, setNavType] = useState(true);
  const [footerType, setFooterType] = useState(true)

  return (
    <>
      <Navbar navState={navType} />
      <Outlet context={[setNavType, setFooterType]} />
      <Footer footerState={footerType} />
    </>
  );
}

export default AppLayout;
