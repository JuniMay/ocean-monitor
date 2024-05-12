import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

const IntelligentCenter: React.FC = () => {

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
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
      <Typography variant="h4">智能中心</Typography>
      {/* 添加智能中心内容 */}
    </div>
  );
};

export default IntelligentCenter;