import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { logout } from "../features/auth/authSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import WaterIcon from "@mui/icons-material/Water";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

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
        <Button
          startIcon={<HomeIcon />}
          color="inherit"
          component={Link}
          to="/home"
        >
          首页
        </Button>
        <Button
          startIcon={<DashboardIcon />}
          color="inherit"
          component={Link}
          to="/dashboard"
        >
          仪表盘
        </Button>
        <Button
          startIcon={<DataThresholdingIcon />}
          color="inherit"
          component={Link}
          to="/data"
        >
          数据中心
        </Button>
        <Button
          startIcon={<WaterIcon />}
          color="inherit"
          component={Link}
          to="/underwater"
        >
          水下系统
        </Button>
        <Button
          startIcon={<AutoAwesomeIcon />}
          color="inherit"
          component={Link}
          to="/intelligent"
        >
          智能中心
        </Button>
        {user?.role === "admin" ? (
          // admin management
          <Button
            startIcon={<AdminPanelSettingsIcon />}
            color="inherit"
            component={Link}
            to="/admin"
          >
            管理员
          </Button>
        ) : (
          <></>
        )}
        <Typography sx={{ flexGrow: 1 }} />
        {isAuthenticated ? (
          <>
            <Button
              startIcon={<PersonIcon />}
              color="inherit"
              component={Link}
              to="/profile"
            >
              {user?.username}
            </Button>
            <Button
              startIcon={<LogoutIcon />}
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
            <Button
              startIcon={<LoginIcon />}
              color="inherit"
              component={Link}
              to="/login"
            >
              登录
            </Button>
            <Button
              startIcon={<AppRegistrationIcon />}
              color="inherit"
              component={Link}
              to="/register"
            >
              注册
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
