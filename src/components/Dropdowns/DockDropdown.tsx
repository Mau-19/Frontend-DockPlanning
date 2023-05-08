import { Dispatch, SetStateAction, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Dock } from "../../types/Dock";

interface Props {
  docks: Dock[];
  selectedDock: Dock | undefined;
  setSelectedDock: Dispatch<SetStateAction<Dock | undefined>>;
  dockId: number;
  weekNr: string;
}

export const DockDropdown: React.FC<Props> = ({
  docks,
  selectedDock,
  setSelectedDock,
  dockId,
  weekNr,
}) => {
  const navigate = useNavigate();
  const handleSetDock = (e: string) => {
    const idToNumber: number = +e;
    const foundDock = getDockFromId(idToNumber);
    if (foundDock) {
      navigate(`/dock/${foundDock.id}/${weekNr}`);
      setSelectedDock(foundDock);
    }
  };

  const getDockFromId = (id: number): Dock | undefined => {
    return docks?.find((dock) => dock?.id === id);
  };

  return (
    <Dropdown
      as={ButtonGroup}
      style={{ width: "130px" }}
      onSelect={handleSetDock}
    >
      <Button variant="dark">{selectedDock?.code}</Button>
      <Dropdown.Toggle split style={{ maxWidth: "25px" }} variant="dark" />
      <Dropdown.Menu>
        {docks?.map((dock, index) => (
          <Dropdown.Item key={index} eventKey={dock.id}>
            {dock.code}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
