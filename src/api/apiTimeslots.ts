import { Timeslot } from "../types/Timeslot";
import { ClientFetchHttpMethod, clientFetch } from "./apiUtil";

export const getTimeslots = async () => {
  return await clientFetch(ClientFetchHttpMethod.GET, `/timeslot/list`, {
    authenticatedRoute: true,
  });
};

export const getTimeslotsByWeekNumbers = async (
  warehouseId: number,
  year: number,
  weekNumbers: number[]
) => {
  return await clientFetch(
    ClientFetchHttpMethod.POST,
    `/timeslot/${warehouseId}/${year}/get_timeslots_by_week_numbers`,
    {
      body: {
        weekNumbers: weekNumbers,
      },
    }
  );
};

export const getTimeslotsByDockWeekAndYear = async (
  dockId: number,
  weekNumber: number,
  year: number
) => {
  return await clientFetch(
    ClientFetchHttpMethod.GET,
    `/timeslot/${dockId}/get_timeslots_by_week/${weekNumber}/${year}`
  );
};

export const moveTimeslot = async (
  timeslotId: number,
  startDateTime: string,
  endDateTime: string,
  dockId: number
) => {
  return await clientFetch(
    ClientFetchHttpMethod.POST,
    `/timeslot/${timeslotId}/move_timeslot`,
    {
      body: {
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        dockId: dockId,
      },
    }
  );
};

export const deleteTimeslot = async (timeslot: Timeslot) => {
  if (timeslot.identifier !== undefined) {
    return await clientFetch(
      ClientFetchHttpMethod.POST,
      `/timeslot/remove_by_identifier`,
      {
        body: {
          identifier: timeslot.identifier,
        },
      }
    );
  }
  return await clientFetch(ClientFetchHttpMethod.POST, `/timeslot/remove`, {
    body: {
      timeslotId: timeslot.id,
    },
    authenticatedRoute: true,
  });
};
