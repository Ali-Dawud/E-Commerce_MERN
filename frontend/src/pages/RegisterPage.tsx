import { Box, Button, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";


function RegisterPage() {
  const [error, setError] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSumbit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;


    const response = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      setError("Unble to register user, please try different credientials!")
      return
    }
  };
  return (
    <Container>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={4}
      >
        <Typography variant="h4" color="initial">
          Register New Account
        </Typography>
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
          {error  && <Typography sx={{color:'red'}}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
