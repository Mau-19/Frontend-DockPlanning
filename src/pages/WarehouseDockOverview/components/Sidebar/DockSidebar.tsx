import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";

import { WeekOverviewCard } from "../../../../components/Sidebar/WeekOverviewCard";

import { Dock } from "../../../../types/Dock";
import { TimeslotByDockId } from "../../../../types/Timeslot";

interface Props {
  docks: Dock[];
  timeslotsByDockId: TimeslotByDockId;
}

export const DockSidebar: React.FC<Props> = ({ docks, timeslotsByDockId }) => {
  return (
    <div
      style={{
        padding: "0px 4px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {docks?.map((dock, index) => (
        <motion.div
          key={dock.id}
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
              item={dock.code}
              capacity={timeslotsByDockId[dock.id]}
            />
          </Row>
        </motion.div>
      ))}
    </div>
  );
};
