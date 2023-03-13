export const determineCapacityColors = (
  currentReservations: number,
  maxReservations: number
): string => {
  const percentage = (currentReservations / maxReservations) * 100;

  if (percentage <= 25) {
    return "grey";
  } else if (percentage > 25 && percentage <= 50) {
    return "green";
  } else if (percentage > 25 && percentage <= 50) {
    return "orange";
  }
  return "red";
};
