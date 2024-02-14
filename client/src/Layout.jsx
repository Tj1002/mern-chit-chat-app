import React from "react";
import Header from "./components/Header";
import { Footer } from "flowbite-react";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
