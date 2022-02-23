import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import "./FormDialog.css";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
<<<<<<< HEAD
import { isFocusable } from "@testing-library/user-event/dist/utils";
import { fetchUser, login, selectUser } from "../../features/user/userSlice";
=======
import { login, selectUser } from "../../features/user/userSlice";
>>>>>>> ef4f616e3650a0a7ad80de7cf0772a3704207a0e
import { useDispatch, useSelector } from "react-redux";
const FormDialog = (props: any) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4444/login", {
        email: email,
        password: password,
      });
      const payload = response.data.split(".")[1];
      if (!payload) throw new Error("Server did not provide JWT Token");
      dispatch(
        login({ value: JSON.parse(atob(payload)), token: response.data })
      );
      setError("");
    } catch (error) {
      console.log(error);
      setError("Username or Password invalid.");
    }
  };
  const fbLogin = () => {};
  const linkedLogin = () => {};
  const gitLogin = () => {};

  return (
    <div className="form-dialog">
      <Button variant="outlined" size="small" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => handleSubmit(e)}>
            <DialogContentText>
              Sign in with
              <IconButton onClick={linkedLogin} style={{ color: "blue" }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton onClick={fbLogin} style={{ color: "blue" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton onClick={gitLogin} style={{ color: "gray" }}>
                <GitHubIcon />
              </IconButton>
              <br />
              or
            </DialogContentText>
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
              helperText={email ? " " : "*Email cannot be empty !!!"}
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
              helperText={email ? " " : "*Email cannot be empty !!!"}
              FormHelperTextProps={{ sx: { color: "error.main" } }}
            />
            <br />
            <Button onClick={handleSubmit}>Login</Button>
            <Typography variant="body2" sx={{ color: "error.main" }}>
              {error ? error : ""}
            </Typography>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
