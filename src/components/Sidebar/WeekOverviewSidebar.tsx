import { useState } from "react";

import Row from "react-bootstrap/Row";

import { WeekOverviewCard } from "./WeekOverviewCard";
import { motion } from "framer-motion";

interface props {
  mapping?: number[] | string[];
}

export const WeekOverviewSidebar: React.FC<props> = ({ mapping }) => {
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
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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

export const variants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  hide: {
    y: -20,
    opacity: 0,
  },
};
