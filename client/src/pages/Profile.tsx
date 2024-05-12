import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        用户资料
      </Typography>
      <Typography>用户名: {user?.username}</Typography>
      <Typography>角色: {user?.role}</Typography>
      {/* 添加其他用户设置 */}
    </div>
  );
};

export default Profile;
