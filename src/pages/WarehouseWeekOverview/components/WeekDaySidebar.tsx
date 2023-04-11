import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";
import { WeekOverviewCard } from "../../../components/Sidebar/WeekOverviewCard";

import { TimeslotByDay } from "../../../types/Timeslot";

interface Props {
  timeslotsByDay: TimeslotByDay | undefined;
  dockTimeslotCapacity: number;
}

export const WeekDaySidebar: React.FC<Props> = ({
  timeslotsByDay,
  dockTimeslotCapacity,
}) => {
  return (
    <div>
      {Object.keys(timeslotsByDay)?.map((day, index) => (
        <motion.div
          key={day}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Row
            style={{
              margin: "2px 0px",
            }}
            key={index}
          >
            <WeekOverviewCard
              item={day}
              totalCapacity={dockTimeslotCapacity}
              capacity={timeslotsByDay[day]}
            />
          </Row>
        </motion.div>
      ))}
    </div>
  );
};
