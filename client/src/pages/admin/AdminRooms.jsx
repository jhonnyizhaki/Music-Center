import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import axios from "axios"
import urls from "../../constant/URLS"

const AdminRooms = () => {
  const [rooms, setRooms] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editRoom, setEditRoom] = useState(null)
  const [formData, setFormData] = useState({
    roomNumber: "",
    capacity: "",
    isVIP: false,
    pricePerHour: "",
    isAvailable: true,
  })

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${urls.BASE_URL}/admin/rooms`)
      setRooms(response.data)
    } catch (error) {
      console.error("Error fetching rooms:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editRoom) {
        await axios.put(`${urls.BASE_URL}/admin/rooms/${editRoom._id}`, formData)
      } else {
        await axios.post(`${urls.BASE_URL}/admin/rooms`, formData)
      }
      setOpenDialog(false)
      fetchRooms()
      resetForm()
    } catch (error) {
      console.error("Error saving room:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`${urls.BASE_URL}/admin/rooms/${id}`)
        fetchRooms()
      } catch (error) {
        console.error("Error deleting room:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      roomNumber: "",
      capacity: "",
      isVIP: false,
      pricePerHour: "",
      isAvailable: true,
    })
    setEditRoom(null)
  }

  const columns = [
    { field: "roomNumber", headerName: "Room Number", width: 130 },
    { field: "capacity", headerName: "Capacity", width: 130 },
    {
      field: "isVIP",
      headerName: "VIP Room",
      width: 130,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "pricePerHour",
      headerName: "Price/Hour",
      width: 130,
      valueGetter: (params) => `₪${params}`,
    },
    {
      field: "isAvailable",
      headerName: "Available",
      width: 130,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => {
              setEditRoom(params.row)
              setFormData(params.row)
              setOpenDialog(true)
            }}
          >
            <EditIcon />
          </Button>
          <Button onClick={() => handleDelete(params.row._id)} color="error">
            <DeleteIcon />
          </Button>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 0 , backgroundColor: "#cfbe9641"}}>
      <Typography variant="h5" gutterBottom sx={{ color: "white", mb: 4 , textAlign: "center"}}>
       <h1> Manage Practice  Rooms</h1>
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          resetForm()
          setOpenDialog(true)
        }}
        sx={{ mb: 2 }}
      >
        Add Room
      </Button>
      <Box sx={{ height: 400, bgcolor: "background.paper" }}>
        <DataGrid
          rows={rooms}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editRoom ? "Edit Room" : "Add New Room"}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Room Number"
              type="number"
              value={formData.roomNumber}
              onChange={(e) =>
                setFormData({ ...formData, roomNumber: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price per Hour"
              type="number"
              value={formData.pricePerHour}
              onChange={(e) =>
                setFormData({ ...formData, pricePerHour: e.target.value })
              }
              margin="normal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isVIP}
                  onChange={(e) =>
                    setFormData({ ...formData, isVIP: e.target.checked })
                  }
                />
              }
              label="VIP Room"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, isAvailable: e.target.checked })
                  }
                />
              }
              label="Available"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editRoom ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminRooms
