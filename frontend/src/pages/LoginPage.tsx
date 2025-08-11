import { Box, Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate()

  const onSumbit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Check submitted data");
      return;
    }

    const response = await fetch(`${BASE_URL}user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setError("Unble to login user, please try different credientials!");
      return;
    }

    const token = await response.json();
    if (!token) {
      setError("Incorrect token");
      return;
    }

    login(email, token);
    navigate("/")
  };
  return (
    <Container>
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} mt={4}>
        <Typography variant="h4" color="initial"> Login to Your Account</Typography>

        <Box sx={{display: "flex",flexDirection: "column", gap: 2,mt: 2,border: 1,borderColor: "#f5f5f5",p: 2,}}>

          <TextField inputRef={emailRef} name="email" type="email" label="Email" variant="outlined"/>
          <TextField inputRef={passwordRef} name="password" type="password" label="Password" variant="outlined"/>
          
          <Button onClick={onSumbit} variant="contained">Login</Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
