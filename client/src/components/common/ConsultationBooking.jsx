import React, { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useNotification } from "../../context/NotificationContext"
import axios from "axios"

const ConsultationBooking = () => {
  const { showNotification } = useNotification()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "",
    preferredDate: null,
    message: "",
  })

  const topics = [
    "Instrument Purchase",
    "Music Lessons",
    "Room Rental",
    "Instrument Repair",
    "Other",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${urls.BASE_URL}/consultations`, formData)
      showNotification(
        "Consultation request submitted successfully!",
        "success"
      )
      setFormData({
        name: "",
        email: "",
        phone: "",
        topic: "",
        preferredDate: null,
        message: "",
      })
    } catch (error) {
      showNotification("Error submitting consultation request", "error")
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Book a Consultation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Topic</InputLabel>
            <Select
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
            >
              {topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <DateTimePicker
            label="Preferred Date & Time"
            value={formData.preferredDate}
            onChange={(newValue) =>
              setFormData({ ...formData, preferredDate: newValue })
            }
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional Information"
            multiline
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large">
            Submit Request
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConsultationBooking
