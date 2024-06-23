import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
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
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" margin={2} sx={{ flexGrow: 1 }}>
          海洋牧场监测系统
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/home" onClick={handleMenuClose}>
                <HomeIcon /> 首页
              </MenuItem>
              <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
                <DashboardIcon /> 仪表盘
              </MenuItem>
              <MenuItem component={Link} to="/data" onClick={handleMenuClose}>
                <DataThresholdingIcon /> 数据中心
              </MenuItem>
              <MenuItem component={Link} to="/underwater" onClick={handleMenuClose}>
                <WaterIcon /> 水下系统
              </MenuItem>

              {user?.role === "admin" && (
                <MenuItem component={Link} to="/admin" onClick={handleMenuClose}>
                  <AdminPanelSettingsIcon /> 管理员
                </MenuItem>
              )}
              {isAuthenticated ? (
                <>
                  <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
                    <PersonIcon /> {user?.username}
                  </MenuItem>
                  <MenuItem onClick={handleLogout} component={Link} to="/home">
                    <LogoutIcon /> 退出
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                    <LoginIcon /> 登录
                  </MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                    <AppRegistrationIcon /> 注册
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
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

            {user?.role === "admin" && (
              <Button
                startIcon={<AdminPanelSettingsIcon />}
                color="inherit"
                component={Link}
                to="/admin"
              >
                管理员
              </Button>
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
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
