import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import axios from "axios"
import urls from "../../constant/URLS"

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  useEffect(() => {
    console.log(selectedUser)
  }, [selectedUser])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${urls.BASE_URL}/users`)
      setUsers(response.data.users)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`${urls.DELETE_USER}/${selectedUser._id}`)
      setOpenDeleteDialog(false)
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user role:", error)
    }
  }

  const handleRoleChange = async () => {
    console.log({ selectedUser })

    try {
      await axios.put(`${urls.UPDATE_USER_ROLE}`, {
        role: selectedRole,
        userId: selectedUser._id,
      })
      setOpenDialog(false)
      fetchUsers()
    } catch (error) {
      console.error("Error updating user role:", error)
    }
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      renderCell: (id) => parseInt(id.id.slice(-8), 16).toString().slice(-6),
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "admin" ? "primary" : "default"}
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Join Date",
      width: 200,
      valueGetter: (params) => {
        return new Date(params).toLocaleDateString()
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => {
              setSelectedUser(params.row)
              setSelectedRole(params.row.role)
              console.log(params)
              setOpenDialog(true)
            }}
          >
            <EditIcon />
          </Button>
          <Button
            onClick={() => {
              setSelectedUser(params.row)
              setOpenDeleteDialog(true)
            }}
          >
            <DeleteIcon style={{ fill: "red" }} />
          </Button>
        </>
      ),
    },
  ]

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 0, backgroundColor: "#cfbe9641" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
        <h1>Manage Users</h1>
      </Typography>
      <Box sx={{ height: 400, bgcolor: "background.paper" }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            are you shore you want to delete {selectedUser?.email}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={handleDeleteUser}
            variant="contained"
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedRole}
              label="Role"
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleRoleChange} variant="contained">
            Update Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminUsers
