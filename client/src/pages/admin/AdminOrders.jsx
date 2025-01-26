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
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import axios from "axios";
import urls from "../../constant/URLS";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [filters, setFilters] = useState({
    email: "",
    minPrice: "",
    maxPrice: "",
    startDate: "",
    endDate: "",
    paidStatus: "",
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]); // כל שינוי ב-filters יפעיל מחדש את הבקשה לשרת

  const fetchOrders = async () => {
    try {
      // סינון פרמטרים ריקים לפני שליחה לשרת
      const filteredParams = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
      );

      console.log("Fetching orders with filters:", filteredParams); // לוג לסינון הפילטרים לפני שליחה

      const response = await axios.get(urls.ORDERS, { params: filteredParams });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      email: "",
      minPrice: "",
      maxPrice: "",
      startDate: "",
      endDate: "",
      paidStatus: "",
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white", mb: 4 }}>
        Manage Orders
      </Typography>

      {/* תצוגת שדות החיפוש */}
      <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          fullWidth
        />
        <TextField
          label="Min Price"
          variant="outlined"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">₪</InputAdornment>,
          }}
          fullWidth
        />
        <TextField
          label="Max Price"
          variant="outlined"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">₪</InputAdornment>,
          }}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Payment Status</InputLabel>
          <Select
            label="Payment Status"
            name="paidStatus"
            value={filters.paidStatus}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          variant="outlined"
          name="startDate"
          type="date"
          value={filters.startDate}
          onChange={handleFilterChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          variant="outlined"
          name="endDate"
          type="date"
          value={filters.endDate}
          onChange={handleFilterChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="outlined" onClick={clearFilters} sx={{ alignSelf: "center" }}>
          Clear Filters
        </Button>
      </Box>

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
                <Chip label={params ? "Paid" : "Pending"} color={params ? "success" : "warning"} />
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
