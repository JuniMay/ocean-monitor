import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

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