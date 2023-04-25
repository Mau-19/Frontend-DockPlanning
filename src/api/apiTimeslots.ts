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
