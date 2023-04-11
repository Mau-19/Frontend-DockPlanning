import Card from "react-bootstrap/Card";

export const EmptyCard = () => {
  return (
    <>
      <Card
        style={{
          height: "160px",
          maxWidth: "9rem",
          margin: "2px 4px",
          background: "rgb(217 217 217 / 75%)",
          border: "none",
        }}
      >
        <Card.Body>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                margin: "0px 12px",
                fontWeight: "bolder",
                fontSize: "x-large",
              }}
            ></span>
          </div>
          <div>
            <div></div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
