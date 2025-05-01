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
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"
import axios from "axios"
import urls from "../../constant/URLS"

const AdminCategories = () => {
  const [categories, setCategories] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    fetchCategories()
  }, [])

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
      if (editCategory) {
        await axios.put(`${urls.CATEGORIES}/${editCategory._id}`, {
          name: categoryName,
        })
      } else {
        await axios.post(urls.CATEGORIES, { name: categoryName })
      }
      setOpenDialog(false)
      fetchCategories()
      setCategoryName("")
      setEditCategory(null)
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${urls.CATEGORIES}/${id}`)
        fetchCategories()
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
  }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      renderCell: (id) => parseInt(id.id.slice(-8), 16).toString().slice(-6),
    },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => {
              setEditCategory(params.row)
              setCategoryName(params.row.name)
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
    <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "white", mb: 4, textAlign: "center" }}
      >
        <h1>Manage Categories</h1>
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2 }}
      >
        Add Category
      </Button>
      <Box sx={{ height: 400, bgcolor: "background.paper" }}>
        <DataGrid
          rows={categories}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editCategory ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editCategory ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminCategories
