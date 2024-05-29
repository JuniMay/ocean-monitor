import React, { useEffect, useState } from "react";
import {
  Alert,
  Divider,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Typography,
  TextField,
  Button,
  Grid,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const DataCenter: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [hydroData, setHydroData] = useState<HydroData[]>([]);
  const [newData, setNewData] = useState<Partial<HydroData>>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [isAuthenticated, navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/hydrodata");
      setHydroData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/hydrodata", newData);
      fetchData(); // Refresh data after adding
      setNewData({}); // Clear the form
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleImport = async () => {
    // 1. open file dialog
    // 2. send post request with `file: ...` to /api/import/hydrodata
    // 3. refresh data
    // 4. clear the form
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }
      // post the file content in json format: { "csv": "..." }
      const formData = new FormData();
      formData.append("csv", file);
      try {
        await axios.post("/api/import/hydrodata", formData);
        fetchData();
        setNewData({});
      } catch (error) {
        console.error("Error importing data:", error);
      }
    };

    input.click();
  };

  const handleExport = async () => {
    try {
      const response = await axios.get("/api/export/hydrodata", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "hydrodata.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="位置"
              name="location"
              value={newData.location || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="日期"
              name="date"
              type="date"
              value={newData.date || ""}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="水温"
              name="water_temperature"
              type="number"
              value={newData.water_temperature || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="pH"
              name="pH"
              type="number"
              value={newData.pH || ""}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                step: "0.01",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="溶解氧"
              name="dissolved_oxygen"
              type="number"
              value={newData.dissolved_oxygen || ""}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                step: "0.01",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="电导率"
              name="conductivity"
              type="number"
              value={newData.conductivity || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="浊度"
              name="turbidity"
              type="number"
              value={newData.turbidity || ""}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="高锰酸盐指数"
              name="permanganate_index"
              type="number"
              value={newData.permanganate_index || ""}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                step: "0.01",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="氨氮"
              name="ammonia_nitrogen"
              type="number"
              value={newData.ammonia_nitrogen || ""}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                step: "0.001",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="总磷"
              name="total_phosphorus"
              type="number"
              value={newData.total_phosphorus || ""}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                step: "0.001",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="总氮"
              name="total_nitrogen"
              type="number"
              value={newData.total_nitrogen || ""}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{
                step: "0.001",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="现场情况"
              name="site_condition"
              value={newData.site_condition || ""}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  添加数据
                </Button>
              </Grid>
              <Grid item>
                <Button type="button" onClick={handleImport} variant="contained">
                  从 CSV 导入
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="data">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>位置</TableCell>
              <TableCell>日期</TableCell>
              <TableCell>水温</TableCell>
              <TableCell>pH</TableCell>
              <TableCell>溶解氧</TableCell>
              <TableCell>电导率</TableCell>
              <TableCell>浊度</TableCell>
              <TableCell>高锰酸盐指数</TableCell>
              <TableCell>氨氮</TableCell>
              <TableCell>总磷</TableCell>
              <TableCell>总氮</TableCell>
              <TableCell>现场情况</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? hydroData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : hydroData
                        ).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.water_temperature}</TableCell>
                <TableCell>{row.pH}</TableCell>
                <TableCell>{row.dissolved_oxygen}</TableCell>
                <TableCell>{row.conductivity}</TableCell>
                <TableCell>{row.turbidity}</TableCell>
                <TableCell>{row.permanganate_index}</TableCell>
                <TableCell>{row.ammonia_nitrogen}</TableCell>
                <TableCell>{row.total_phosphorus}</TableCell>
                <TableCell>{row.total_nitrogen}</TableCell>
                <TableCell>{row.site_condition || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={hydroData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Divider sx={{ my: 2 }} />
      <Button variant="contained" color="secondary" onClick={handleExport}>
        导出数据
      </Button>
    </div>
  );
};

export default DataCenter;

