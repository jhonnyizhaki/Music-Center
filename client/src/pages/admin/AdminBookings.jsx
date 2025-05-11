import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import axios from "axios"
import urls from "../../constant/URLS"
import { useAuth } from "../../context/AuthContext"
const AdminBookings = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editedBooking, setEditedBooking] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get(urls.BOOKINGS, { withCredentials: true })
      console.log("res.data", response.data)
      setBookings(response.data)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      setError("Error fetching bookings")
    }
  }

  const formatDate = (date) => (date ? new Date(date).toLocaleString() : "")

  const handleEditClick = (booking) => {
    setEditedBooking({ ...booking })
    setEditMode(true)
    setOpenDialog(true)
  }

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`${urls.BOOKINGS}/${id}`, { withCredentials: true })
      setSuccess("Booking deleted successfully!")
      fetchBookings()
    } catch (error) {
      console.error("Error deleting booking:", error)
      setError("Error deleting booking")
    }
  }

  const handleSaveClick = async () => {
    try {
      await axios.patch(`${urls.BOOKINGS}`, editedBooking, {
        withCredentials: true,
      })
      setSuccess("Booking updated!")
      setError("")
      setEditMode(false)
      setOpenDialog(false)
      fetchBookings()
    } catch (error) {
      console.error("Error updating booking:", error)
      setError(error.response?.data?.message || "Error updating booking")
      setSuccess("")
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditedBooking((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleDateTimeChange = (newValue, field) => {
    setEditedBooking((prev) => ({
      ...prev,
      [field]: newValue ? newValue.toDate() : null,
    }))
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 0, backgroundColor: "#cfbe9641" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
        <h1>Manage Bookings</h1>
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}

      <Box sx={{ height: 600, bgcolor: "background.paper" }}>
        <DataGrid
          rows={bookings}
          columns={[
            {
              field: "_id",
              headerName: "Booking ID",
              width: 220,
              renderCell: (id) =>
                parseInt(id.id.slice(-8), 16).toString().slice(-6),
            },
            {
              field: "userId",
              headerName: "User",
              width: 220,
              valueGetter: (params) => params.email,
            },
            { field: "roomNumber", headerName: "Room", width: 100 },
            { field: "participants", headerName: "Participants", width: 100 },
            {
              field: "startTime",
              headerName: "Start Time",
              width: 200,
              valueGetter: (params) => formatDate(params),
            },
            {
              field: "endTime",
              headerName: "End Time",
              width: 200,
              valueGetter: (params) => formatDate(params),
            },
            {
              field: "totalPrice",
              headerName: "Price",
              width: 100,
              valueGetter: (params) => `${params}$`,
            },
            {
              field: "actions",
              headerName: "Actions",
              width: 180,
              renderCell: (params) => (
                <>
                  <Button
                    onClick={() => {
                      setSelectedBooking(params.row)
                      setOpenDialog(true)
                    }}
                  >
                    <VisibilityIcon />
                  </Button>
                  <Button onClick={() => handleEditClick(params.row)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDeleteClick(params.row._id)}>
                    <DeleteIcon />
                  </Button>
                </>
              ),
            },
          ]}
          getRowId={(row) => row?._id}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editMode ? "Edit Booking" : "Booking Details"}
        </DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box>
              <Typography variant="h6">Booking Details:</Typography>
              <Paper sx={{ p: 2, my: 1 }}>
                <Typography>
                  User: {selectedBooking.userId?.email || "N/A"}
                </Typography>
                <Typography>Room: {selectedBooking.roomNumber}</Typography>
                <Typography>
                  Participants: {selectedBooking.participants}
                </Typography>
                <Typography>
                  Start Time: {formatDate(selectedBooking.startTime)}
                </Typography>
                <Typography>
                  End Time: {formatDate(selectedBooking.endTime)}
                </Typography>
                <Typography>Price: {selectedBooking.totalPrice}$</Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {editMode && <Button onClick={handleSaveClick}>Save</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminBookings
