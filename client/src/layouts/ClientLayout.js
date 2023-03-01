import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function ClientLayout() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  console.log(isNavbarOpen);
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#fff",
            color: "#363636",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <header>
        <Navbar setIsNavbarOpen={setIsNavbarOpen} />
      </header>
      <main className={`relative ${isNavbarOpen && 'h-[94vh] overflow-hidden'} text-black dark:text-white pt-4 md:pt-10`}>
        <Outlet />
      </main>
    </div>
  );
}
