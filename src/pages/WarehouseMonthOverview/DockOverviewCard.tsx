import { useState, useEffect } from "react";

import axios from "axios";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import { Dock } from "../../types/Dock";
import { Timeslot } from "../../types/Timeslot";
import { TimeslotByDay } from "../../types/Timeslot";

interface Props {
  reservation?: any;
  index: number;
  dock: Dock;
  weekNr?: number;
}

export const DockOverviewCard: React.FC<Props> = ({ dock, weekNr }) => {
  const sample: TimeslotByDay = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  };
  const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [timeslotsByDay, setTimeslotsByDay] = useState<TimeslotByDay>({});
  const [capacityPercentage, setCapacityPercentage] = useState(0);
  const [show, setShow] = useState(false);
  let timeslotTotal = 0;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeslots = async () => {
      const response = await axios.post(
        `${apiHostAddress}/timeslot/list_by_dock`,
        {
          dockId: dock?.id,
        }
      );
      if (response.status === 200) {
        checkIfTimeslotsInCurrentWeek(response.data);
        groupTimeslotsByWeekDay(response.data);
      }
    };
    fetchTimeslots();
  }, [weekNr, dock]);

  useEffect(() => {
    const dockMax = calculateDockMaxCapacity(dock);
    const timeslotMax = calculateTimeslotCapacity(timeslots);
    setCapacityPercentage(calculateCapacityPercentage(dockMax, timeslotMax));
  }, [dock, timeslots]);

  const calculateCapacityPercentage = (
    dockCapacity: number,
    totalTimeslots: number
  ) => {
    return (totalTimeslots / dockCapacity) * 100;
  };

  const calculateDockMaxCapacity = (dock: Dock) => {
    const startTime = DateTime.fromISO(dock?.params.opening_time);
    const endTime = DateTime.fromISO(dock?.params.closing_time);
    const difference = endTime.diff(startTime).as("minutes") / 15;
    return difference;
  };

  const calculateTimeslotCapacity = (timeslots: Timeslot[]) => {
    timeslots.forEach((timeslot) => {
      const startTime = DateTime.fromISO(timeslot.start_time);
      const endTime = DateTime.fromISO(timeslot.end_time);
      const difference = endTime.diff(startTime).as("minute") / 15;
      timeslotTotal += difference;
    });
    return timeslotTotal;
  };

  const checkIfTimeslotsInCurrentWeek = (timeslots: Timeslot[]) => {
    const filteredTimeslots: Timeslot[] = [];
    timeslots.forEach((timeslot) => {
      const startTime = DateTime.fromISO(timeslot.start_time);
      const startWeekNr = startTime.weekNumber;
      if (startWeekNr == weekNr && timeslot?.params.locationId === dock.id) {
        filteredTimeslots.push(timeslot);
      }
    });
    setTimeslots(filteredTimeslots);
  };

  const groupTimeslotsByWeekDay = (timeslots: Timeslot[] | undefined) => {
    timeslots?.forEach((timeslot) => {
      const startTime = DateTime.fromISO(timeslot.start_time);
      const dayOfWeek = startTime.toFormat("EEEE");

      if (dayOfWeek in sample) {
        sample[dayOfWeek].push(timeslot);
      }
    });
    setTimeslotsByDay(sample);
  };

  useEffect(() => {
    groupTimeslotsByWeekDay(timeslots);
  }, [timeslots]);

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
              <span>{weekNr}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
              }}
            >
              <h5>Dock</h5>
              <span>{dock.code}</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
              }}
            >
              <h5>Reservations</h5>
              <span>{timeslots?.length}</span>
            </div>
          </div>
        </Modal.Header>
        <Table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Reservations</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(sample)?.map((day, index) => (
              <tr key={index}>
                <td>{day}</td>
                <td>{timeslotsByDay[day]?.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "max-content",
            }}
          >
            {capacityPercentage < 50 ? (
              <span
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "green",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            ) : capacityPercentage >= 50 && capacityPercentage < 75 ? (
              <span
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "orange",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            ) : (
              <span
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
            )}

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
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={clickHandler}
          >
            <h1>{timeslots?.length}</h1>
            {timeslots?.length === 1 ? (
              <span>Reservation</span>
            ) : (
              <span>Reservations</span>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
