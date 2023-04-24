import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";

import { TimeslotByWeekNr } from "../../../types/Timeslot";

import { WeekOverviewCard } from "../../../components/Sidebar/WeekOverviewCard";

interface Props {
  timeslotsByWeekNr: TimeslotByWeekNr;
}

export const MonthSidebar: React.FC<Props> = ({ timeslotsByWeekNr }) => {
  return (
    <div
      style={{
        padding: "0px 4px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {Object.keys(timeslotsByWeekNr)?.map((weekNr, index) => (
        <motion.div
          key={weekNr}
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
              item={weekNr}
              capacity={timeslotsByWeekNr[weekNr]}
              week={true}
            />
          </Row>
        </motion.div>
      ))}
    </div>
  );
};
