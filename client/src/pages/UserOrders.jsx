import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import axios from "axios";
import * as jwt_decode from "jwt-decode"; // הייבוא של jwt-decode
import urls from "./../constant/URLS";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (token) {
        const decodedToken = jwt_decode(token); // דיקוד הטוקן
        const userId = decodedToken.userId; // שליפת מזהה המשתמש

        // שליחת בקשה להזמנות
        const response = await axios.get(urls.ORDERS);

        // סינון הזמנות של המשתמש הנוכחי בלבד
        const userOrders = response.data.orders.filter(
          (order) => order.userId === userId
        );
        setOrders(userOrders);
      } else {
        console.error("No token found, user is not authenticated.");
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#333", mb: 4, textAlign: "center" }}>
        <h1>Your Orders</h1>
      </Typography>

      <Box sx={{ height: 400, bgcolor: "white", borderRadius: "8px" }}>
        <DataGrid
          rows={orders}
          columns={[
            { field: "_id", headerName: "Order ID", width: 220 },
            {
              field: "totalPrice",
              headerName: "Total Price",
              width: 130,
              valueGetter: (params) => `₪${params.row.totalPrice}`,
            },
            {
              field: "isPaid",
              headerName: "Payment Status",
              width: 130,
              renderCell: (params) => (
                <Chip
                  label={params.row.isPaid ? "Paid" : "Pending"}
                  color={params.row.isPaid ? "success" : "warning"}
                  sx={{
                    color: "white",
                    borderColor: "gold",
                    backgroundColor: params.row.isPaid ? "green" : "orange",
                  }}
                />
              ),
            },
            {
              field: "createdAt",
              headerName: "Order Date",
              width: 200,
              valueGetter: (params) => formatDate(params.row.createdAt),
            },
            {
              field: "actions",
              headerName: "Actions",
              width: 130,
              renderCell: (params) => (
                <Button
                  onClick={() => {
                    setSelectedOrder(params.row);
                    setOpenDialog(true);
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
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
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
                  <Typography>Name: {item.instrumentId?.name || "N/A"}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Price: ₪{item.instrumentId?.price || 0}</Typography>
                </Paper>
              ))}
              <Typography variant="h6" sx={{ mt: 2, color: "#333" }}>
                Total Price: ₪{selectedOrder.totalPrice}
              </Typography>
              <Typography sx={{ color: "#333" }}>
                Order Date: {formatDate(selectedOrder.createdAt)}
              </Typography>
              <Typography sx={{ color: "#333" }}>
                Payment Status: {selectedOrder.isPaid ? "Paid" : "Payment Pending"}
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
  );
};

export default UserOrders;
