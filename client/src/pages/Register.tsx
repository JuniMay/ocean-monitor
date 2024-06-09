import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  Grid,
  Link,
  Alert,
} from "@mui/material";
import { login as loginAction } from '../features/auth/authSlice';
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userData = await register(username, password, role);
      dispatch(loginAction(userData));
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const serverMessage = error.response.data.message || "注册失败，请重试";
        setErrorMessage(serverMessage);
      } else {
        setErrorMessage("注册失败，请重试");
      }
      console.error("Registration failed", error);
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
        注册
      </Typography>
      <Box sx={{ mt: 2 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="账户名"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              required
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value as string)}
            >
              <MenuItem value="user">用户</MenuItem>
              <MenuItem value="admin">管理员</MenuItem>
            </Select>
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
            <Button fullWidth variant="contained" onClick={handleRegister}>
              注册
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }} />
        <Link href="/login" variant="body2">
          已有账户？登录
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
