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
} from "@mui/material";
import { getUsers, updateUserRole } from "../services/admin";

interface User {
  id: number;
  username: string;
  role: string;
}

const AdminManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

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
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
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
