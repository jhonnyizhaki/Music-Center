import React, { useEffect, useState } from "react"
import urls from "../constant/URLS"
import axios from "axios"
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
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { Visibility as VisibilityIcon } from "@mui/icons-material"
import * as jwt_decode from "jwt-decode" // הייבוא החדש של jwt-decode
import { useAuth } from "../context/AuthContext"
import { format, isBefore } from "date-fns"

const UserBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  const { user } = useAuth()

  useEffect(() => console.log(selectedBooking), [selectedBooking])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(urls.GET_USER_BOOKING)
        setBookings(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching instruments:", error)
        setError("Error loading instruments")
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])
  const formatDate = (date) => {
    return format(new Date(date), "yyyy/MM/dd hh:mm")
  }
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Box sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: "#f5f5f5" }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#333", mb: 4 }}>
            Your Bookings
          </Typography>

          <Box sx={{ height: 400, bgcolor: "white", borderRadius: "8px" }}>
            <DataGrid
              rows={bookings}
              columns={[
                { field: "_id", headerName: "Booking ID", width: 220 },
                {
                  field: "userEmail",
                  headerName: "Email",
                  width: 220,
                  valueGetter: () => user.email || "N/A",
                },
                {
                  field: "totalPrice",
                  headerName: "Total Price",
                  width: 130,
                  valueGetter: (params) => `₪${params}`,
                },
                {
                  field: "isPaid",
                  headerName: "Payment Status",
                  width: 130,
                  renderCell: (params) => (
                    <Chip
                      label={params ? "Paid" : "Pending"}
                      color={params ? "success" : "warning"}
                      sx={{
                        color: "white",
                        borderColor: "gold",
                        backgroundColor: params ? "green" : "orange",
                      }}
                    />
                  ),
                },
                {
                  field: "createdAt",
                  headerName: "Order Date",
                  width: 200,
                  valueGetter: (params) => formatDate(params),
                },
                {
                  field: "endTime",
                  headerName: "is past",
                  width: 220,
                  renderCell: (params) => (
                    <Chip
                      label={
                        isBefore(new Date(), new Date(params.formattedValue))
                          ? "dedent past"
                          : "is past"
                      }
                      color={
                        isBefore(new Date(), new Date(params.formattedValue))
                          ? "success"
                          : "warning"
                      }
                      sx={{
                        color: "white",
                        borderColor: "gold",
                        backgroundColor: isBefore(
                          new Date(),
                          new Date(params.formattedValue)
                        )
                          ? "skyBlue"
                          : "red",
                      }}
                    />
                  ),
                },
                {
                  field: "actions",
                  headerName: "Actions",
                  width: 130,
                  renderCell: (params) => (
                    <Button
                      onClick={() => {
                        setSelectedBooking(params.row)
                        console.log(params.row)

                        setOpenDialog(true)
                      }}
                      sx={{
                        color: "gold",
                        "&:hover": {
                          backgroundColor: "rgba(255, 215, 0, 0.1)",
                        },
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
            <DialogTitle sx={{ color: "gold" }}>booking Details</DialogTitle>
            <DialogContent>
              {selectedBooking && (
                <Box>
                  <Typography variant="h6" sx={{ color: "#333" }}>
                    booking Items:
                  </Typography>
                  {selectedBooking.rentInstruments.map((item, index) => (
                    <Paper
                      key={(console.log(selectedBooking), index)}
                      sx={{
                        p: 2,
                        my: 1,
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    >
                      <BookingCard
                        product={{
                          ...item.instrumentId,
                          withArtist: item.artist,
                        }}
                      />
                    </Paper>
                  ))}
                  <Typography sx={{ color: "#333" }}>
                    room number: {selectedBooking.roomNumber}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2, color: "#333" }}>
                    Total Price: ₪{selectedBooking.totalPrice}
                  </Typography>
                  <Typography sx={{ color: "#333" }}>
                    booking Date: {formatDate(selectedBooking.startTime)}
                  </Typography>
                  <Typography sx={{ color: "#333" }}>
                    Payment Status:{" "}
                    {selectedBooking.isPaid ? "Paid" : "Payment Pending"}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDialog(false)}
                sx={{ color: "gold" }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  )
}
function BookingCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="350"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          name: {product.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          category: {product.category}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {product.withArtist ? "with artist" : ""}
        </Typography>
        <Typography variant="h6" color="text.primary" mt={1}>
          price per hour ₪{product.rentPrice}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default UserBookings
