import React from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material"
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from "@mui/icons-material"

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: "50%",
            p: 1,
            display: "flex",
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

const AdminDashboardStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `₪${stats.totalRevenue.toLocaleString()}`,
      icon: <AttachMoney sx={{ color: "#4caf50" }} />,
      color: "#4caf50",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart sx={{ color: "#2196f3" }} />,
      color: "#2196f3",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <People sx={{ color: "#ff9800" }} />,
      color: "#ff9800",
    },
    {
      title: "Growth",
      value: "+12%",
      icon: <TrendingUp sx={{ color: "#f44336" }} />,
      color: "#f44336",
    },
  ]

  return (
    <Grid container spacing={3}>
      {statCards.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  )
}

export default AdminDashboardStats
