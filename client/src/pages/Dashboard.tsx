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
// interface ChartData {
//   name: string;
//   temperature: number | null;
//   averageTemperature?: number | null;
// }

interface MonthlyData {
  month: string;
  averageTemperature: number | null;
  averagePH: number | null;
}

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  // const [data, setData] = useState<ChartData[]>([]);
  const [data, setData] = useState<MonthlyData[]>([]);
  const [latestData, setLatestData] = useState<HydroData | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // Fetch data from API
      axios.get<HydroData[]>("/api/hydrodata")
        .then(response => {
          const rawData = response.data;

          // // 计算每个月的平均温度
          // const monthlyData: { [key: string]: { total: number; count: number } } = {};
          // 计算每个月的平均温度和平均pH值
          const monthlyData: { [key: string]: { totalTemp: number; totalPH: number; count: number } } = {};

          rawData.forEach(item => {
            const month = item.date.slice(0, 7); // 提取年月
            if (!monthlyData[month]) {
              // monthlyData[month] = { total: 0, count: 0 };
              monthlyData[month] = { totalTemp: 0, totalPH: 0, count: 0 };
            }
            // monthlyData[month].total += item.water_temperature;
            // monthlyData[month].count += 1;
            monthlyData[month].totalTemp += item.water_temperature;
            monthlyData[month].totalPH += item.pH;
            monthlyData[month].count += 1;
          });

          // const formattedData = rawData.map((item: HydroData): ChartData => ({
          //   name: item.date,
          //   temperature: item.water_temperature,
          //   averageTemperature: monthlyData[item.date.slice(0, 7)].total / monthlyData[item.date.slice(0, 7)].count,
          // }));
          const formattedData = Object.keys(monthlyData).map(month => ({
            month,
            averageTemperature: monthlyData[month].totalTemp / monthlyData[month].count,
            averagePH: monthlyData[month].totalPH / monthlyData[month].count,
          }));

          setData(formattedData);

          // 获取最新的水质信息
          if (rawData.length > 0) {
            const latestEntry = rawData.reduce((latest, item) => {
              return new Date(item.date) > new Date(latest.date) ? item : latest;
            }, rawData[0]);
            setLatestData(latestEntry);
            generateAlerts(latestEntry);
          }
        })
        .catch(error => {
          console.error("Error fetching hydrodata:", error);
        });
    }
  }, [isAuthenticated, navigate]);

  const calculateScore = (dissolvedOxygen: number,permanganate_index: number,ammonia_nitrogen: number,total_phosphorus: number,pH: number): number => {
    if(pH >= 6 && pH <= 9){
      if (dissolvedOxygen >= 7.5 && permanganate_index <= 2 && ammonia_nitrogen <= 0.15 && total_phosphorus <= 0.02) return 5;
      if (dissolvedOxygen >= 6 && permanganate_index <= 4 && ammonia_nitrogen <= 0.5 && total_phosphorus <= 0.1) return 4;
      if (dissolvedOxygen >= 5 && permanganate_index <= 6 && ammonia_nitrogen <= 1 && total_phosphorus <= 0.2) return 3;
      if (dissolvedOxygen >= 3 && permanganate_index <= 10 && ammonia_nitrogen <= 1.5 && total_phosphorus <= 0.3) return 2;
      if (dissolvedOxygen >= 2 && permanganate_index <= 15 && ammonia_nitrogen <= 2 && total_phosphorus <= 0.4) return 1;
    }
    return 0;
  };

  const generateAlerts = (data: HydroData) => {
    const alerts: string[] = [];
    if (data.dissolved_oxygen < 3) {
      alerts.push("溶解氧低于3 mg/L，水质较差！");
    }
    if (data.permanganate_index > 10) {
      alerts.push("高锰酸盐指数超过10 mg/L，水质较差！");
    }
    if (data.ammonia_nitrogen > 1.5) {
      alerts.push("氨氮超过1.5 mg/L，水质较差！");
    }
    if (data.total_phosphorus > 0.3) {
      alerts.push("总磷超过0.3 mg/L，水质较差！");
    }
    setAlerts(alerts);
  };

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
              <CardHeader title="月平均温度变化曲线" />
              <CardContent>
                <LineChart width={1000} height={200} data={data}>
                  <Line type="monotone" dataKey="averageTemperature" name="月平均温度" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="月平均pH值变化曲线" />
              <CardContent>
                <LineChart width={1000} height={200} data={data}>
                  <Line type="monotone" dataKey="averagePH" name="月平均pH值" stroke="#82ca9d" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="month" />
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
                {alerts.map((alert, index) => (
                  <React.Fragment key={index}>
                    <Alert severity="warning">{alert}</Alert>
                    {index < alerts.length - 1 && <Divider sx={{ my: 1 }} />}
                  </React.Fragment>
                ))}
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
                {latestData && (
                  <>
                    <Typography component="legend">最新水质信息获取时间: {latestData.date}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography component="legend">水质得分：{calculateScore(latestData.dissolved_oxygen,
                                                            latestData.permanganate_index,
                                                            latestData.ammonia_nitrogen,
                                                            latestData.total_phosphorus,
                                                            latestData.pH)}</Typography>
                    <Rating name="read-only" value={calculateScore(latestData.dissolved_oxygen,
                                                            latestData.permanganate_index,
                                                            latestData.ammonia_nitrogen,
                                                            latestData.total_phosphorus,
                                                            latestData.pH)} readOnly precision={0.5} />
                    <Divider sx={{ my: 2 }} />
                  </>
                )}
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
