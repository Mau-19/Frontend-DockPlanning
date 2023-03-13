import { useState } from "react";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

interface Props {
  reservation: any;
  index: number;
}

export const DockOverviewCard: React.FC<Props> = ({ reservation, index }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  const percentage =
    (reservation.currentReservations / reservation.maxReservations) * 100;
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
          maxWidth: "70%",
          margin: "2px 0px",
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
            {percentage <= 25 && (
              <span
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "#0d6efd",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            )}
            {percentage > 25 && percentage <= 50 && (
              <span
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            )}
            {percentage > 50 && percentage <= 75 && (
              <span
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "orange",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            )}
            {percentage > 75 && (
              <span
                style={{
                  height: "15px",
                  width: "15px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            )}
            <span style={{ margin: "0px 12px", fontWeight: "bold" }}>
              Dock {index + 1}
            </span>
            <FontAwesomeIcon
              onClick={handleShow}
              icon={faCalendar}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <h1>{reservation.currentReservations}</h1>
          <span>Reservations</span>
        </Card.Body>
      </Card>
    </>
  );
};
