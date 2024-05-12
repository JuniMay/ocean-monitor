import React, { useEffect } from "react";
import {
  CardMedia,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, Alert } from "@mui/material";

const UnderWaterSystem: React.FC = () => {
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
      <Typography variant="h4">水下系统</Typography>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Card>
              <CardMedia component="video" src="placeholder.mp4" controls />
              <CardHeader title="录像" />
              <Alert severity="info">此处为示例视频</Alert>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader title="水下系统状态信息" />
              <CardContent>
                <Alert severity="info">这是一条水下系统状态信息提示</Alert>
                <Divider sx={{ my: 1 }} />
                <Alert severity="info">这是一条水下系统状态信息提示</Alert>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardHeader title="水下环境得分" />
              <CardContent>
                <Alert severity="info">环境得分仅供参考</Alert>
                <Divider sx={{ my: 2 }} />
                <Typography component="legend">鱼群类型</Typography>
                <Rating name="read-only" value={3} readOnly precision={0.5} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UnderWaterSystem;
