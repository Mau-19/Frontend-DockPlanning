import { useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import AuthContext from "../../context/AuthContext";

export const LoginForm = () => {
  const apiHostAddress = import.meta.env.VITE_NODE_API_HOST;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios
      .post(`${apiHostAddress}/auth/signin`, {
        username: username,
        password: password,
      })
      .catch((error) => {
        if (error.response.status == 404) {
          setError("User not found");
        } else if (error.response.status == 401) {
          setError("Combination of username and/or password is not correct");
        }
      });

    if (response?.status == 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser({
        id: response.data.id,
        accessToken: response.data.accessToken,
        username: response.data.username,
        email: response.data.email,
      });
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={submitFormHandler}
      style={{
        background: "white",
        borderRadius: "8px",
        padding: "24px 32px",
        width: "400px",
        marginTop: "16px",
      }}
    >
      {error && (
        <Alert variant="danger" style={{ marginTop: "8px" }}>
          {error}
        </Alert>
      )}
      <Form.Group controlId="formUsername">
        <Form.Label style={{ fontWeight: "bold" }}>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{
            background: "rgba(32, 58, 129, 0.2)",
          }}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            background: "rgba(32, 58, 129, 0.2)",
          }}
        />
      </Form.Group>
      {username && password ? (
        <Button
          type="submit"
          style={{
            width: "100%",
            marginTop: "8px",
          }}
        >
          Log In
        </Button>
      ) : (
        <Button
          type="submit"
          style={{
            width: "100%",
            marginTop: "8px",
          }}
          disabled
        >
          Log In
        </Button>
      )}
    </Form>
  );
};
