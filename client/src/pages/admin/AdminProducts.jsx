import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import axios from "axios"
import urls from "../../constant/URLS"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    imageUrl: "",
    stock: "",
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(urls.INSTRUMENTS)
      setProducts(response.data)
      console.log("res.data", response.data);
      
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(urls.CATEGORIES)
      setCategories(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editProduct) {
        await axios.put(`${urls.INSTRUMENTS}/${editProduct._id}`, formData)
      } else {
        await axios.post(urls.INSTRUMENTS, formData)
      }
      setOpenDialog(false)
      fetchProducts()
      resetForm()
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${urls.INSTRUMENTS}/${id}`)
        fetchProducts()
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      imageUrl: "",
      stock: "",
    })
    setEditProduct(null)
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "stock", headerName: "Stock", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => {
              setEditProduct(params.row)
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
    <Box sx={{ height: 600, width: "100%", p: 3, mt: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Manage Products
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
        Add Product
      </Button>
      <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)", height: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id || row.name + row.price}          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              margin="normal"
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Image URL"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Stock"
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editProduct ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminProducts
