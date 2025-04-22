import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { Visibility as VisibilityIcon } from "@mui/icons-material"
import axios from "axios"
import urls from "../../constant/URLS"

const AdminContactMessages = () => {
  // States
  const [messages, setMessages] = useState([])
  const [selectedMsg, setSelectedMsg] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(urls.CONTACT)
      setMessages(response.data.messages)
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  /**
   * Function updates the isRead property for a given row when pressing the eye button.
   * @param id The row id to update.
   */
  const updateRead = async (id) => {
    try {
      // Make the request to update the resource @ the server
      await axios.put(`${urls.UPDATE_CONTACT_MSG_READ}/${id}`)

      // Locally update the isRead property to see the updated value in the UI
      console.log("mapping rows")
      setMessages(
        messages.map((row) => {
          console.log(row)
          if (row._id === id) {
            // The current row is the updated one - update "isReed"
            return {
              ...row,
              isReed: true,
            }
          } else {
            // The current row is NOT the updated one - return the same row
            return row
          }
        })
      )
    } catch (err) {
      console.error("Error updating read")
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 0, backgroundColor: "#cfbe9641" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
        <h1>Contact Us Messages </h1>{" "}
      </Typography>

      <Box sx={{ height: 400, bgcolor: "background.paper" }}>
        <DataGrid
          rows={messages}
          columns={[
            {
              field: "fullName",
              headerName: "Full Name",
              width: 180,
              valueGetter: (params) => params || "N/A",
            },
            {
              field: "email",
              headerName: "Email",
              width: 220,
              valueGetter: (params) => params || "N/A",
            },
            {
              field: "isReed",
              headerName: "Has Read",
              width: 130,
              renderCell: (params) => {
                const isReed = params.row.isReed
                return (
                  <Chip
                    label={isReed ? "Read" : "Not Read"}
                    color={isReed ? "success" : "warning"}
                  />
                )
              },
            },
            {
              field: "subject",
              headerName: "Subject",
              width: 130,
              valueGetter: (params) => params || "N/A",
            },
            {
              field: "message",
              headerName: "Message",
              width: 200,
              valueGetter: (params) => params || "No message",
            },
            {
              field: "createdAt",
              headerName: "Created At",
              width: 200,
              valueGetter: (params) => formatDate(params),
            },
            {
              field: "actions",
              headerName: "Actions",
              width: 130,
              renderCell: (params) => (
                <Button
                  onClick={() => {
                    setSelectedMsg(params.row)
                    setOpenDialog(true)
                    updateRead(params.row._id)
                  }}
                >
                  <VisibilityIcon />
                </Button>
              ),
            },
          ]}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      {/* Dialog for Order Details */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Message Details</DialogTitle>
        <DialogContent>
          {selectedMsg && (
            <Box>
              <Typography variant="h6">Order Items:</Typography>
              <Typography>Full Name: {selectedMsg.fullName}</Typography>
              <Typography>Email: {selectedMsg.email}</Typography>
              <Typography>Subject: {selectedMsg.subject}</Typography>
              <Typography>Message: {selectedMsg.message}</Typography>

              <Typography>
                Order Date: {formatDate(selectedMsg.createdAt)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminContactMessages
