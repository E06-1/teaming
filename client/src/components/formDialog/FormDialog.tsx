import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import "./FormDialog.css";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import axios from "axios";
import { isFocusable } from "@testing-library/user-event/dist/utils";
import { login, selectUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const FormDialog = (props: any) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [vEmail, setVEmail] = useState<boolean>(false);
  const [vPass, setVPass] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<any>(null);
  const dispatch = useDispatch();
  const user: any = useSelector(selectUser);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
    setVEmail(false);
    setVPass(false);
  };
  const validEmail = () => {
    if (email !== "") setVEmail(true);
  };
  const validPassword = () => {
    if (password !== "") setVPass(true);
  };
  const handleValid = async () => {
    const tmp = await axios
      .post(
        "http://localhost:4444/login",
        { email: email, password: password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res: any) => {
        dispatch(login(res.data));
      });
    return tmp;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let d = await handleValid();
    setCredentials(d);
    console.log("cred = ", credentials);
  };
  const fbLogin = () => {};
  const linkedLogin = () => {};
  const gitLogin = () => {};
  useEffect(() => {
    validEmail();
  }, [email]);
  useEffect(() => {
    validPassword();
  }, [password]);

  return (
    <Fragment>
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
              />
              {vEmail ? (
                ""
              ) : (
                <small style={{ color: "red" }}>
                  *Email cannot be empty !!!
                </small>
              )}
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
              />
              {vPass ? (
                ""
              ) : (
                <small style={{ color: "red" }}>
                  *Password cannot be empty !!!
                </small>
              )}
              <br />
              <Button onClick={handleSubmit}>Login</Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  );
};

export default FormDialog;
