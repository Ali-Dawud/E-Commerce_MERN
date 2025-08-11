import { Box, Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  const onSumbit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      setError("Check submitted data");
      return;
    }

    //Make the call to API to create the user
    const response = await fetch(`${BASE_URL}user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      setError("Unble to register user, please try different credientials!");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);
    navigate("/");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4">Register New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            borderColor: "#f5f5f5",
            p: 2,
          }}
        >
          <TextField
            inputRef={firstNameRef}
            name="firstName"
            label="Frist Name"
            variant="outlined"
          />
          <TextField
            inputRef={lastNameRef}
            name="lastName"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            inputRef={emailRef}
            name="email"
            type="email"
            label="Email"
            variant="outlined"
          />
          <TextField
            inputRef={passwordRef}
            name="password"
            type="password"
            label="Password"
            variant="outlined"
          />
          <Button onClick={onSumbit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
