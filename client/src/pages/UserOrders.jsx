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
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { Visibility as VisibilityIcon } from "@mui/icons-material"
import axios from "axios"
import * as jwt_decode from "jwt-decode" // הייבוא החדש של jwt-decode
import urls from "./../constant/URLS"
import { useAuth } from "../context/AuthContext"

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const serverRes = await axios.get(urls.BASE_URL + "/orders/userOrders")
    setOrders(serverRes.data.orders)
  }
  const { user } = useAuth()

  const formatDate = (date) => {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0") // הוספת אפס מוביל
    const day = String(d.getDate()).padStart(2, "0")
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#333", mb: 4, textAlign: "center" }}
      >
        <h1> My Orders</h1>
      </Typography>

      <Box sx={{ height: 400, bgcolor: "white", borderRadius: "8px" }}>
        <DataGrid
          rows={orders}
          columns={[
            {
              field: "_id",
              headerName: "Order ID",
              width: 220,
              renderCell: (id) =>
                parseInt(id.id.slice(-8), 16).toString().slice(-6),
            },
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
              field: "actions",
              headerName: "Actions",
              width: 130,
              renderCell: (params) => (
                <Button
                  onClick={() => {
                    setSelectedOrder(params.row)
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
        <DialogTitle sx={{ color: "gold" }}>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" sx={{ color: "#333" }}>
                Order Items:
              </Typography>
              {selectedOrder.items.map((item, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    my: 1,
                    backgroundColor: "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  <ProductCard
                    product={{
                      ...item.instrumentId,
                      quantity: item.quantity,
                      price: item.originalPrice ?? item.instrumentId.price,
                    }}
                  />
                </Paper>
              ))}
              <Typography variant="h6" sx={{ mt: 2, color: "#333" }}>
                Total Price: ₪{selectedOrder.totalPrice}
              </Typography>
              <Typography sx={{ color: "#333" }}>
                Order Date: {formatDate(selectedOrder.createdAt)}
              </Typography>
              <Typography sx={{ color: "#333" }}>
                Payment Status:{" "}
                {selectedOrder.isPaid ? "Paid" : "Payment Pending"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: "gold" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
function ProductCard({ product }) {
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
          quantity: {product.quantity}
        </Typography>
        <Typography variant="h6" color="text.primary" mt={1}>
          ₪{product.price}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserOrders
