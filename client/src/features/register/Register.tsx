import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";
import { login } from "../user/userSlice";

export default function Register() {
  const dispatch = useAppDispatch();

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user",
        { email, password, username },
        { headers: { "Content-Type": "application/json" } }
      );
      const payloadB64 = response.data.split(".")[1];
      if (!payloadB64) throw new Error("Server did not provide JWT Token");
      const payload = atob(payloadB64);
      console.log(payload);
      dispatch(login({ value: JSON.parse(payload), token: response.data }));
      setError("");
    } catch (error) {
      console.log(error);
      setError("Email Adress already in use!");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setError("");
  };
  return (
    <div>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Register
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              id="username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              label="Username"
              type="text"
              required
              fullWidth
              variant="standard"
              helperText={username ? " " : "*Username cannot be empty !!!"}
              FormHelperTextProps={{ sx: { color: "error.main" } }}
            />
            <TextField
              margin="dense"
              id="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              label="Email Address"
              type="email"
              required
              fullWidth
              variant="standard"
              helperText={username ? " " : "*Username cannot be empty !!!"}
              FormHelperTextProps={{ sx: { color: "error.main" } }}
            />
            <TextField
              margin="dense"
              id="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              label="Password"
              type="password"
              required
              fullWidth
              variant="standard"
              helperText={username ? " " : "*Username cannot be empty !!!"}
              FormHelperTextProps={{ sx: { color: "error.main" } }}
            />
            <br />
            <Button type="submit">Register</Button>
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {error ? error : " "}
            </Typography>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
