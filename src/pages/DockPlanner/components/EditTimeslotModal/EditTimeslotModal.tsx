import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
      <Form style={{ padding: "8px" }}>
        <Form.Group controlId="formDockSelector">
          <Form.Label>Dock:</Form.Label>
          <Form.Select>
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formDatePicker">
          <Form.Label>Timeslot Date</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Stack direction="horizontal" gap={3} style={{ marginTop: "8px" }}>
          <Button variant="danger">
            Delete Reservation <FontAwesomeIcon icon={faTrashCan} />
          </Button>
          <Button variant="success" className="ms-auto">
            Save Changes <FontAwesomeIcon icon={faSave} />
          </Button>
        </Stack>
      </Form>
    </Modal>
  );
};
