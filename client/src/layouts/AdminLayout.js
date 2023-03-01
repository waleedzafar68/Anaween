import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SideBar from "../admin/components/Navigation/SideBar";
import withAuthorizaton from "../admin/Authorizaton";

function AdminLayout() {
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
      <main id="pageContainer" className="flex w-full bg-[#eee]">
        <SideBar />
        <section id="page_section" className="w-full">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default withAuthorizaton(AdminLayout);