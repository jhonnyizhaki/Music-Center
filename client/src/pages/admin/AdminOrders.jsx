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
import urls from "../../constant/URLS";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(urls.ORDERS);
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 0  , backgroundColor: "#cfbe9641"}}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
<h1>Manage Orders </h1>      </Typography>

      <Box sx={{ height: 400, bgcolor: "background.paper" }}>
        <DataGrid
          rows={orders}
          columns={[
            { field: "_id", headerName: "Order ID", width: 220 },
            {
              field: "userId",
              headerName: "User",
              width: 220,
              valueGetter: (params) => params?.email || "N/A",
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
                    setSelectedOrder(params.row);
                    setOpenDialog(true);
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
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography variant="h6">Order Items:</Typography>
              {selectedOrder.items.map((item, index) => (
                <Paper key={index} sx={{ p: 2, my: 1 }}>
                  <Typography>Product: {item.instrumentId?.name || "N/A"}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Price: ₪{item.instrumentId?.price || 0}</Typography>
                </Paper>
              ))}
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total Price: ₪{selectedOrder.totalPrice}
              </Typography>
              <Typography>Order Date: {formatDate(selectedOrder.createdAt)}</Typography>
              <Typography>
                Payment Status: {selectedOrder.isPaid ? "Paid" : "Payment Pending"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminOrders;
