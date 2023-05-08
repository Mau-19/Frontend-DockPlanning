import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShuttleVan,
  faTruck,
  faXmarksLines,
} from "@fortawesome/free-solid-svg-icons";

import { getCargoById } from "../../../api/apiCargo";

import { Timeslot } from "../../../types/Timeslot";

interface Props {
  timeslot: Timeslot;
}

export const OrderOverviewCard: React.FC<Props> = ({ timeslot }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [show, setShow] = useState(false);

  const { data: cargo, isLoading: isCargoLoading } = useQuery(
    ["cargo"],
    () => getCargoById(timeslot.params.cargoId),
    {
      enabled: show,
    }
  );

  useEffect(() => {
    const startTimeSimple = DateTime.fromISO(timeslot.start_time)?.toFormat(
      "HH:mm"
    );
    const endTimeSimple = DateTime.fromISO(timeslot.end_time)?.toFormat(
      "HH:mm"
    );

    setStartTime(startTimeSimple);
    setEndTime(endTimeSimple);
  }, []);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleHide}>
        {isCargoLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Modal.Header
              style={{
                background: "#203A81",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <h4>Cargo Id: {cargo?.id}</h4>
              </div>
            </Modal.Header>
            <Table>
              <thead>
                <tr>
                  <th>Order#</th>
                  <th>Customer ID</th>
                  <th>Goods</th>
                </tr>
              </thead>
              <tbody>
                {cargo?.goods.map((good) => (
                  <tr key={good.id}>
                    <td>{good.code}</td>
                    <td>{good.params.clientId}</td>
                    <td>{good.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Modal>
      <Card
        style={{
          height: "160px",
          maxWidth: "9rem",
          margin: "2px 4px",
        }}
        onClick={handleShow}
      >
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "144px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                margin: "0px 12px",
                fontWeight: "bolder",
                fontSize: "x-large",
              }}
            >
              {timeslot.id}
            </span>
          </div>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>
              {timeslot?.cargoTypeId <= 3 ? (
                <FontAwesomeIcon
                  icon={faShuttleVan}
                  style={{ height: "50px", width: "50px" }}
                />
              ) : timeslot?.cargoTypeId > 3 && timeslot?.cargoTypeId <= 6 ? (
                <FontAwesomeIcon
                  icon={faTruck}
                  style={{ height: "50px", width: "50px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faXmarksLines}
                  style={{ height: "50px", width: "50px" }}
                />
              )}
            </div>
            <div>
              <span style={{ fontSize: "smaller" }}>
                {startTime} - {endTime}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
