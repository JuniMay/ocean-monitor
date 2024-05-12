import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { login as loginAction } from '../features/auth/authSlice';
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = await login(username, password);
      dispatch(loginAction(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setError("登录失败，请检查用户名和密码");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Typography variant="h4" gutterBottom>
        登录
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="用户名"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="密码"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="记住我"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleLogin}>
              登录
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }} />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              忘记密码？
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              注册新账户
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
