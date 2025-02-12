import Main from "../../layout/Main";
import AdminAside from "./layout/adminAside/AdminAside";
import AdminHeader from "./layout/header/AdminHeader";

const Admin = () => {
  return (
    <section className="w-full relative Admin-dashboard h-screen overflow-hidden bg-[#f5f7fb] z-[0]">
      <div className="flex flex-col-2 h-full">
        <div className="hidden xl:block">
          <AdminAside />
        </div>
        <div className="w-[100%] pb-1 scroll-to-top overflow-y-scroll custom-scroll">
          <AdminHeader />
          <Main />
        </div>
      </div>
    </section>
  );
};

export default Admin;
