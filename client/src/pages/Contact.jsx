import React, { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { Phone, Email, LocationOn, AccessTime } from "@mui/icons-material"
import { useNotification } from "../context/NotificationContext"
import axios from "axios"
import urls from "../constant/URLS"

const Contact = () => {
  const { showNotification } = useNotification()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${urls.BASE_URL}/contact`, formData)
      showNotification("Message sent successfully!", "success")
      setFormData({ fullName: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.log({ error })
      showNotification("An error occurred while sending the message", "error")
    }
  }

  const contactInfo = [
    { icon: <Phone />, primary: "Phone", secondary: "050-3089987" },
    { icon: <Email />, primary: "Email", secondary: "creatoryry@gmail.com" },
    {
      icon: <LocationOn />,
      primary: "Address",
      secondary: "Zvi Nishri St 6, Tel Aviv-Jaffa",
    },
    {
      icon: <AccessTime />,
      primary: "Working Hours",
      secondary: "Sun-Thu: 9:00-21:00, Fri: 9:00-14:00",
    },
  ]

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 10,
        backgroundColor: "#f3eee2",
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* כותרת */}
      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
        sx={{
          color: "#8c7437",
          fontWeight: "bold",
          fontFamily: "serif",
        }}
      >
        Contact Us
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        textAlign="center"
        sx={{ maxWidth: 600, mx: "auto", mb: 6 }}
      >
        We'd love to hear from you! Fill out the form or contact us directly.
      </Typography>

      {/* תוכן עמוד */}
      <Grid container spacing={5} justifyContent="center">
        {/* מידע */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Card
            sx={{
              width: "100%",
              maxWidth: 420,
              backgroundColor: "#fffaf3",
              borderRadius: 3,
              boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#af934c", fontWeight: 600 }}
              >
                Contact Information
              </Typography>
              <List>
                {contactInfo.map((item) => (
                  <ListItem key={item.primary}>
                    <ListItemIcon sx={{ color: "#af934c" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.primary}
                      secondary={item.secondary}
                      primaryTypographyProps={{ fontWeight: "bold" }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* טופס */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Card
            sx={{
              width: "100%",
              maxWidth: 420,
              backgroundColor: "#fffaf3",
              borderRadius: 3,
              boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#af934c", fontWeight: 600 }}
              >
                Contact Form
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    backgroundColor: "#af934c",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#8c7437",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Contact
