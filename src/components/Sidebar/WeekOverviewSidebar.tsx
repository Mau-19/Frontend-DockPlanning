import Row from "react-bootstrap/Row";
import { motion } from "framer-motion";

import { WeekOverviewCard } from "./WeekOverviewCard";

interface Props {
  mapping?: number[] | string[];
}

export const WeekOverviewSidebar: React.FC<Props> = ({ mapping }) => {
  return (
    <div
      style={{
        padding: "0px 4px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {mapping?.map((item, index) => (
        <motion.div
          key={item}
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
            <WeekOverviewCard item={mapping[index]} />
          </Row>
        </motion.div>
      ))}
    </div>
  );
};
