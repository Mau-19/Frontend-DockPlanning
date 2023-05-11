import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { EditTimeslotModal } from "../EditTimeslotModal/EditTimeslotModal";

import { getCargoById } from "../../../../api/apiCargo";

import { Timeslot } from "../../../../types/Timeslot";

interface Props {
  timeslot: Timeslot;
}

export const DockColumnCard: React.FC<Props> = ({ timeslot }) => {
  const [showCargo, setShowCargo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const startDateTime = useMemo(
    () => DateTime.fromISO(timeslot?.start_time),
    [timeslot?.start_time]
  );
  const endDateTime = useMemo(
    () => DateTime.fromISO(timeslot?.end_time),
    [timeslot?.end_time]
  );

  const { data: cargo, isLoading } = useQuery(
    ["cargo", timeslot?.id],
    () => getCargoById(timeslot.params.cargoId),
    {
      enabled: showCargo,
    }
  );

  const handleShowEditForm = () => {
    setShowCargo(false);
    setShowEdit(true);
  };

  return (
    <>
      <Modal show={showCargo} onHide={() => setShowCargo(false)}>
        {isLoading ? (
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "4px",
          }}
        >
          <Button variant="dark" onClick={handleShowEditForm}>
            Edit Reservation <FontAwesomeIcon icon={faPen} />
          </Button>
        </div>
      </Modal>
      <EditTimeslotModal
        timeslot={timeslot}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
      />
      <Card
        style={{
          background: "rgba(32, 58, 129, 0.2)",
          border: "none",
          margin: "4px 0px",
          height: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => setShowCargo(true)}
      >
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h5>{timeslot.id}</h5>
          <span>
            {startDateTime.toFormat("HH:mm")} -{endDateTime.toFormat("HH:mm")}
          </span>
        </Card.Body>
      </Card>
    </>
  );
};
