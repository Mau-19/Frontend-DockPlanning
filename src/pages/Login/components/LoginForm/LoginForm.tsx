import { useState, useContext } from "react";

import { useMutation, QueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { login } from "../../../../api/apiAuth";

import AuthContext from "../../../../context/AuthContext";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const signInMutation = useMutation(
    (credentials) => login(credentials.username, credentials.password),
    {
      onSuccess: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser({
          id: data.id,
          accessToken: data.accessToken,
          username: data.username,
          email: data.email,
        });
        navigate("/");
      },
      onError: (error) => {
        if (error?.response?.status == 404) {
          setError("User not found");
        } else if (error?.response?.status == 401) {
          setError("Incorrect username or password");
        }
      },
    }
  );

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInMutation.mutate({ username, password });
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
