import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./MainLayout.css";
function MainLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        {children}
      </div>
    </div>
  );
}

export default MainLayout;
