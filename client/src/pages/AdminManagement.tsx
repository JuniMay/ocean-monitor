import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Alert,
  Divider,
} from "@mui/material";
import { getUsers, updateUserRole } from "../services/admin";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  role: string;
}

const AdminManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && user?.role !== "admin") {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return null;
  }

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const handleRoleChange = async (userId: number, role: string) => {
    try {
      await updateUserRole(userId, role);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user role", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        管理员管理
      </Typography>

      <Alert severity="warning">请谨慎操作</Alert>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>用户名</TableCell>
              <TableCell>角色</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Typography>{user.username}</Typography>
                </TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value as string)
                    }
                  >
                    <MenuItem value="user">用户</MenuItem>
                    <MenuItem value="admin">管理员</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminManagement;
