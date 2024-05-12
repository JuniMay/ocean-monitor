import React, { useEffect } from "react";
import {
  Alert,
  Divider,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

const DataCenter: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const createData = (
    timestamp: number,
    temperature: number,
    humidity: number,
    pressure: number,
    latitude: number,
    longitude: number
  ) => {
    return {
      timestamp,
      temperature,
      humidity,
      pressure,
      latitude,
      longitude,
    };
  };

  // Sample data
  const rows = [
    createData(1629788400000, 25, 60, 1013, 31.2, 121.5),
    createData(1629788500000, 26, 61, 1014, 31.3, 121.6),
    createData(1629788600000, 27, 62, 1015, 31.4, 121.7),
    createData(1629788700000, 28, 63, 1016, 31.5, 121.8),
    createData(1629788800000, 29, 64, 1017, 31.6, 121.9),
  ];

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
        数据中心
      </Typography>
      <Alert severity="info">此处为示例信息</Alert>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="data">
          <TableHead>
            <TableRow>
              <TableCell>时间戳</TableCell>
              <TableCell>温度</TableCell>
              <TableCell>湿度</TableCell>
              <TableCell>气压</TableCell>
              <TableCell>纬度</TableCell>
              <TableCell>经度</TableCell>
            </TableRow>
            {rows.map((row) => (
              <TableRow>
                <TableCell>
                  {new Date(row.timestamp).toISOString().split("T")[0]}
                </TableCell>
                <TableCell>{row.temperature}</TableCell>
                <TableCell>{row.humidity}</TableCell>
                <TableCell>{row.pressure}</TableCell>
                <TableCell>{row.latitude}</TableCell>
                <TableCell>{row.longitude}</TableCell>
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataCenter;
