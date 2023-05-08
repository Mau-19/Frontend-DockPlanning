import { Dock } from "../types/Dock";
import { ClientFetchHttpMethod, clientFetch } from "./apiUtil";

export const getTimeslots = async () => {
  return await clientFetch(ClientFetchHttpMethod.GET, `/timeslot/list`, {
    authenticatedRoute: true,
  });
};

export const getTimeslotsByDockId = async (dock: Dock) => {
  return await clientFetch(
    ClientFetchHttpMethod.POST,
    `/timeslot/list_by_dock`,
    {
      body: {
        dockId: dock?.id,
      },
    }
  );
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
