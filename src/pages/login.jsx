import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user.token) {
    navigate("/cars");
  }

  return (
    <Dialog open={true}>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography variant="h3">Sign in</Typography>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <TextField
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </FormControl>
        <Button onClick={() => signIn(email, password)}>Sign in</Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
