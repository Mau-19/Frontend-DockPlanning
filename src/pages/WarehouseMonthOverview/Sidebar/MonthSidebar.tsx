import { useQuery } from "@tanstack/react-query";
import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";

import { getTimeslotsByWeekNumbers } from "../../../api/apiTimeslots";

import { WeekOverviewCard } from "../../../components/Sidebar/WeekOverviewCard";

interface Props {
  year: number;
  warehouseId: number;
  weekNumbers: number[];
}

export const MonthSidebar: React.FC<Props> = ({
  year,
  warehouseId,
  weekNumbers,
}) => {
  const { data: timeslotsByWeekNr = [], isLoading: isTimeslotsLoading } =
    useQuery(["timeslotsByWeekNr", weekNumbers], () =>
      getTimeslotsByWeekNumbers(warehouseId, year, weekNumbers)
    );
  if (isTimeslotsLoading) {
    return <h1>Loading...</h1>;
  }
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
