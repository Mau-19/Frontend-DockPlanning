import { useEffect } from "react";

import ProgressBar from "react-bootstrap/ProgressBar";

interface Props {
  currentReservations?: number;
  maxReservations?: number;
}

export const StyledProgressBar: React.FC<Props> = ({
  currentReservations,
  maxReservations,
}) => {
  const percentage = 40;
  {
    if (percentage <= 25) {
      return (
        <ProgressBar
          max={maxReservations}
          now={currentReservations}
          variant="info"
          style={{
            paddingLeft: "0px",
          }}
        />
      );
    } else if (percentage > 25 && percentage <= 50) {
      return (
        <ProgressBar
          max={200}
          now={129}
          variant="success"
          style={{
            paddingLeft: "0px",
          }}
        />
      );
    } else if (percentage > 50 && percentage <= 75) {
      return (
        <ProgressBar
          max={maxReservations}
          now={currentReservations}
          variant="warning"
          style={{
            paddingLeft: "0px",
          }}
        />
      );
    }
    return (
      <ProgressBar
        max={maxReservations}
        now={currentReservations}
        variant="danger"
        style={{
          paddingLeft: "0px",
        }}
      />
    );
  }
};
