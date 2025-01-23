import React from "react"
import { Box, Grid, Paper, Typography } from "@mui/material"
import {
  People,
  Inventory,
  Category,
  ShoppingCart,
  MeetingRoom,
  Dashboard,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { styled } from "@mui/material/styles"

const AdminCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  transition: "transform 0.2s",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: theme.palette.primary.light,
    color: "white",
  },
}))

const AdminDashboard = () => {
  const navigate = useNavigate()

  const adminMenuItems = [
    {
      title: "Dashboard",
      icon: <Dashboard fontSize="large" />,
      path: "/admin/stats",
    },
    {
      title: "Products",
      icon: <Inventory fontSize="large" />,
      path: "/admin/products",
    },
    {
      title: "Categories",
      icon: <Category fontSize="large" />,
      path: "/admin/categories",
    },
    {
      title: "Orders",
      icon: <ShoppingCart fontSize="large" />,
      path: "/admin/orders",
    },
    {
      title: "Practice Rooms",
      icon: <MeetingRoom fontSize="large" />,
      path: "/admin/rooms",
    },
    {
      title: "Users",
      icon: <People fontSize="large" />,
      path: "/admin/users",
    },
  ]

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white", mb: 4 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {adminMenuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <AdminCard onClick={() => navigate(item.path)}>
              {item.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {item.title}
              </Typography>
            </AdminCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default AdminDashboard
