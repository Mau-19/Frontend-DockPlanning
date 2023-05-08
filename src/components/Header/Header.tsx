import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCalendar,
  faPenToSquare,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../context/AuthContext";

import * as S from "./Header.styles";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/Logo-Frigo.png" height={45} width={50} />
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
                  <S.ListItem
                    onClick={() => {
                      navigate("/dock-overview");
                      handleClose();
                    }}
                  >
                    <span style={{ paddingRight: "4px" }}>
                      Reservations - Dock
                    </span>
                    <FontAwesomeIcon icon={faCalendar} />
                  </S.ListItem>
                  <S.ListItem>
                    <span
                      style={{ paddingRight: "4px" }}
                      onClick={() => {
                        navigate("/plan");
                        handleClose();
                      }}
                    >
                      Planner
                    </span>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </S.ListItem>
                  <S.ListItem
                    onClick={() => alert("Link to reservation adding tool")}
                  >
                    <span style={{ paddingRight: "4px" }}>
                      Add reservations
                    </span>
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </S.ListItem>
                  <S.ListItem onClick={logout}>
                    <span style={{ paddingRight: "4px" }}>Logout</span>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </S.ListItem>
                </ul>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </>
        )}
      </Container>
    </Navbar>
  );
};
