import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../features/auth/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" margin={2}>
          海洋牧场监测系统
        </Typography>
        <Button color="inherit" component={Link} to="/home">
          首页
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          仪表盘
        </Button>
        <Typography sx={{ flexGrow: 1 }} />
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/profile">
              {user?.username}
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              component={Link}
              to="/home"
            >
              退出
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              登录
            </Button>
            <Button color="inherit" component={Link} to="/register">
              注册
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
