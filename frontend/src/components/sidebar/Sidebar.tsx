import useSidebar from "../../hooks/useSidebar";
import SidebarNav from "./SidebarNav";
import Logo from "../../assets/logo.svg";

const Sidebar = () => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
          <a className="sidebar-brand" href="/" style={{backgroundColor: "#f4f7f9"}}>
            <img src={Logo} height={50} width={200} />
          </a>
          <SidebarNav />
      </div>
    </nav>
  );
};

export default Sidebar;
