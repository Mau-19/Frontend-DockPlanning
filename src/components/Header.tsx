import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../context/AuthContext";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleOpen = () => {
    setOpen(() => !open);
  };

  const handleClose = () => {
    setOpen(() => false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser({});
    handleClose();
    navigate("/login");
  };

  return (
    <Navbar
      style={{ backgroundColor: " #203A81" }}
      collapseOnSelect
      expand="false"
    >
      <Container fluid>
        <Navbar.Brand>
          <img
            src="https://frigobreda.com/wp-content/uploads/2023/01/Logo-Frigo.png"
            height={45}
            width={50}
          />
        </Navbar.Brand>
        {localStorage.getItem("user") != null && (
          <>
            <Navbar.Toggle
              style={{ background: "white" }}
              onClick={toggleOpen}
            />
            <Navbar.Offcanvas
              id={`offCanvasNavbar-expand`}
              aria-labelledby={`offCanvasNavbarLabel-expand`}
              placement="end"
              show={open}
              onHide={handleClose}
            >
              <Offcanvas.Header
                closeButton
                style={{ backgroundColor: "#203A81", color: "white" }}
              >
                <Offcanvas.Title>
                  <h4 style={{ color: "white" }}>Hello {user.username}</h4>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ul>
                  <li>item 1</li>
                  <li>item 2</li>
                  <li>item 3</li>
                  <li style={{ cursor: "pointer" }} onClick={logout}>
                    <span style={{ paddingRight: "4px" }}>Logout</span>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </li>
                </ul>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}
      </Container>
    </Navbar>
  );
};
