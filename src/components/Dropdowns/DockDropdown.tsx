import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import { Dock } from "../../types/Dock";

interface Props {
  docks: Dock[];
}

export const DockDropdown: React.FC<Props> = ({ docks }) => {
  const [dropdownDock, setDropdownDock] = useState("");
  const { dockId, weekNr } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(dockId);
    const dockCode = getDockCodeFromId(dockId);
    setDropdownDock(dockCode);
  }, [docks]);

  const handleSetDock = (e: string) => {
    const foundDockId = getDockIdFromCode(e);
    navigate(`/dock/${foundDockId}/${weekNr}`);
    setDropdownDock(e);
  };

  const getDockIdFromCode = (dockCode: string): number => {
    return docks?.find((d) => d?.code === dockCode)?.id;
  };

  const getDockCodeFromId = (id: number): string => {
    return docks?.find((d) => d?.id === id)?.code;
  };

  return (
    <Dropdown
      as={ButtonGroup}
      style={{ width: "130px" }}
      onSelect={handleSetDock}
    >
      <Button variant="dark">{dropdownDock}</Button>
      <Dropdown.Toggle split style={{ maxWidth: "25px" }} variant="dark" />
      <Dropdown.Menu>
        {docks?.map((dock, index) => (
          <Dropdown.Item key={index} eventKey={dock.code}>
            {dock.code}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
