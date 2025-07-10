import { Navbar, Nav } from "react-bootstrap";
import useSidebar from "../../hooks/useSidebar";
import NavbarUser from "./NavbarUser";

const NavbarComponent = () => {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <Navbar variant="light" expand className="navbar-bg">
      <span
        className="sidebar-toggle d-flex"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <i className="hamburger align-self-center" />
      </span>


      <Navbar.Collapse>
        <Nav className="navbar-align">
            <NavbarUser />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
