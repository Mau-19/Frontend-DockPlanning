import { LoginForm } from "../../components/Forms/LoginForm";

export const Login = () => {
  return (
    <div
      style={{
        background: "#D9D9D9",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 72px)",
        padding: "0px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Log in</h1>
        <LoginForm />
      </div>
    </div>
  );
};
