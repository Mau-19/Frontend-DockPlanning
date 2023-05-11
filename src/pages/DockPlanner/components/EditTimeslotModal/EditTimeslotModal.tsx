import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { getDocksByWarehouseId } from "../../../../api/apiDocks";
import { deleteTimeslot, moveTimeslot } from "../../../../api/apiTimeslots";

import { Timeslot } from "../../../../types/Timeslot";

interface Props {
  timeslot: Timeslot;
  showEdit: boolean;
  setShowEdit: any;
}

export const EditTimeslotModal: React.FC<Props> = ({
  timeslot,
  showEdit,
  setShowEdit,
}) => {
  const [startTime, setStartTime] = useState(
    DateTime.fromISO(timeslot.start_time)
  );
  const [endTime, setEndTime] = useState(DateTime.fromISO(timeslot.end_time));
  const [selectedOption, setSelectedOption] = useState(
    timeslot.params.locationId
  );
  const [error, setError] = useState("");
  const { data: docks, isLoading } = useQuery(["docks"], () =>
    getDocksByWarehouseId(timeslot.warehouseId)
  );

  const queryClient = useQueryClient();

  const changeTimeslotMutation = useMutation(
    () =>
      moveTimeslot(
        timeslot.id,
        startTime.toISO(),
        endTime.toISO(),
        +selectedOption
      ),
    {
      onSuccess: (data) => {
        setShowEdit(false);
        queryClient.invalidateQueries(["docks"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const deleteTimeslotMutation = useMutation(() => deleteTimeslot(timeslot), {
    onSuccess: () => {
      setShowEdit(false);
      queryClient.invalidateQueries(["docks"]);
    },
    onError(error) {
      setError(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (endTime < startTime) {
      setError("End time cannot be before start time.");
      return;
    }
    changeTimeslotMutation.mutate();
  };

  const handleDelete = () => {
    deleteTimeslotMutation.mutate();
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(DateTime.fromISO(e.target.value));
  };

  const handleEndTimeChange = (e) => {
    setEndTime(DateTime.fromISO(e.target.value));
  };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Modal show={showEdit} onHide={() => setShowEdit(false)}>
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
          <h4>Timeslot Id: {timeslot?.id}</h4>
        </div>
      </Modal.Header>
      <Form style={{ padding: "8px" }} onSubmit={handleSubmit}>
        <Form.Group controlId="formDockSelector">
          <Form.Label>Dock:</Form.Label>
          <Form.Select value={selectedOption} onChange={handleChange}>
            {docks?.map((dock) => (
              <option key={dock.id} value={dock.id}>
                {dock.code}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="startTimeDatePicker">
          <Form.Label>Start Time:</Form.Label>
          <Form.Control
            type="datetime-local"
            defaultValue={startTime.toFormat("yyyy-MM-dd'T'HH:mm")}
            onChange={handleStartTimeChange}
          />
        </Form.Group>
        <Form.Group controlId="endTimeDatePicker">
          <Form.Label>End Time:</Form.Label>
          <Form.Control
            type="datetime-local"
            defaultValue={endTime.toFormat("yyyy-MM-dd'T'HH:mm")}
            onChange={handleEndTimeChange}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Stack direction="horizontal" gap={3} style={{ marginTop: "8px" }}>
          <Button variant="danger" onClick={handleDelete}>
            Delete Reservation <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button variant="success" className="ms-auto" type="submit">
            Save Changes <FontAwesomeIcon icon={faSave} />
          </Button>
        </Stack>
      </Form>
    </Modal>
  );
};
