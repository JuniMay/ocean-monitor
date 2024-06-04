import React, { useEffect, useState } from "react";
import { Container, Divider, Grid, Rating, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, Alert } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import axios from "axios";

// 定义接口来表示从API返回的数据结构
interface HydroData {
  id: number;
  location: string;
  date: string;
  water_temperature: number;
  pH: number;
  dissolved_oxygen: number;
  conductivity: number;
  turbidity: number;
  permanganate_index: number;
  ammonia_nitrogen: number;
  total_phosphorus: number;
  total_nitrogen: number;
  site_condition?: string; // Optional property
}

// 定义接口来表示图表数据
interface ChartData {
  name: string;
  temperature: number | null;
}

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Fetch data from API
      axios.get<HydroData[]>("/api/hydrodata")
        .then(response => {
          const formattedData = response.data.map((item: HydroData): ChartData => ({
            name: item.date,
            temperature: item.water_temperature,
          }));
          setData(formattedData);
        })
        .catch(error => {
          console.error("Error fetching hydrodata:", error);
        });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4">主要信息</Typography>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="温度变化曲线" />
              <CardContent>
                <LineChart width={1000} height={200} data={data}>
                  <Line type="monotone" dataKey="temperature" name="温度" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader title="预警信息" />
              <CardContent>
                <Alert severity="error">这是一条错误信息！</Alert>
                <Divider sx={{ my: 1 }} />
                <Alert severity="warning">这是一条预警信息！</Alert>
                <Divider sx={{ my: 1 }} />
                <Alert severity="error">这是一条错误信息！</Alert>
                <Divider sx={{ my: 1 }} />
                <Alert severity="warning">这是一条预警信息！</Alert>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader title="状态信息" />
              <CardContent>
                <Alert severity="info">这是一条状态信息提示</Alert>
                <Divider sx={{ my: 1 }} />
                <Alert severity="info">这是一条状态信息提示</Alert>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader title="环境得分计算" />
              <CardContent>
                <Alert severity="info">环境得分仅供参考</Alert>
                <Divider sx={{ my: 2 }} />
                <Typography component="legend">水质得分</Typography>
                <Rating name="read-only" value={4} readOnly precision={0.5} />
                <Divider sx={{ my: 2 }} />
                <Typography component="legend">鱼群类型</Typography>
                <Rating name="read-only" value={3} readOnly precision={0.5} />
                <Divider sx={{ my: 2 }} />
                <Typography component="legend">总得分</Typography>
                <Rating name="read-only" value={3.5} readOnly precision={0.5} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;