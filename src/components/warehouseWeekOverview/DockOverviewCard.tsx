import { useState } from "react";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { Dock } from "../../types/Dock";

interface Props {
  reservation?: any;
  index: number;
  dock: Dock;
  weekNr?: number;
}

export const DockOverviewCard: React.FC<Props> = ({
  reservation,
  index,
  dock,
  weekNr,
}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);
  const clickHandler = () => {
    navigate(`/dock/${dock.id}/${weekNr}`);
  };

  return (
    <>
      <Modal show={show} onHide={handleHide}>
        <Modal.Header
          closeButton
          style={{
            background: "#203A81",
            color: "white",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
              }}
            >
              <h5>Week</h5>
              <span>6</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
              }}
            >
              <h5>Dock</h5>
              <span>2</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
              }}
            >
              <h5>Reservations</h5>
              <span>162</span>
            </div>
          </div>
        </Modal.Header>
        <p>Placeholder text</p>
        <p>Table to be inserted</p>
      </Modal>
      <Card
        style={{
          height: "160px",
          maxWidth: "9rem",
          margin: "2px 4px",
        }}
      >
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                height: "17px",
                width: "20px",
                backgroundColor: "red",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
            <span style={{ margin: "0px 12px", fontWeight: "bold" }}>
              {dock.code}
            </span>
            <FontAwesomeIcon
              onClick={handleShow}
              icon={faCalendar}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <div style={{ cursor: "pointer" }} onClick={clickHandler}>
            <h1>162</h1>
            <span>Reservations</span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
