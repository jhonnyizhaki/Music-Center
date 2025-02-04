import React from "react"
import { Box, Grid, Paper, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useState, useEffect } from "react"
import axios from "axios"
import urls from "../../constant/URLS"

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  height: "100%",
}))

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    recentOrders: [],
    popularProducts: [],
    categoryStats: [],
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${urls.BASE_URL}/admin/stats`)
        console.log("res.data", response.data)

        setStats(response.data)
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }
    fetchStats()
  }, [])

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Typography variant="h5" gutterBottom sx={{ color: "white", mb: 4 , textAlign: "center" }}>
        <h1>Statistics Dashboard</h1>
      </Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <StatsCard>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h3">{stats.totalOrders}</Typography>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h3">₪{stats.totalRevenue}</Typography>
          </StatsCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{stats.totalUsers}</Typography>
          </StatsCard>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <StatsCard>
            <Typography variant="h6" gutterBottom>
              Sales by Category
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={stats.categoryStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {stats.categoryStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StatsCard>
            <Typography variant="h6" gutterBottom>
              Popular Products
            </Typography>
            <BarChart width={400} height={300} data={stats.popularProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </StatsCard>
        </Grid>

        <Grid item xs={12}>
          <StatsCard>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <LineChart width={900} height={300} data={stats.recentOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </StatsCard>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminStats
