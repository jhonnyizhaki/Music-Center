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

const Contact = () => {
  const { showNotification } = useNotification()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${urls.BASE_URL}/contact`, formData)
      showNotification("Message sent successfully!", "success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      showNotification("An error occurred while sending the message", "error")
    }
  }

  const contactInfo = [
    {
      icon: <Phone />,
      primary: "Phone",
      secondary: "0503089987",
    },
    {
      icon: <Email />,
      primary: "Email",
      secondary: "creatoryry@gmail.com",
    },
    {
      icon: <LocationOn />,
      primary: "Address",
      secondary: "Zvi Nishri St 6, Tel Aviv-Jaffa",
    },
    {
      icon: <AccessTime />,
      primary: "Working Hours",
      secondary: "Sunday-Thursday: 9:00-21:00, Friday: 9:00-14:00",
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 8 ,backgroundColor: "#cfbe9641"}}>
      <Typography variant="h3" textAlign="center" gutterBottom color={"#af934c"}>
        Contact Us
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        textAlign="center"
        paragraph
      >
        We are happy to assist you with any question or request
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <List>
                {contactInfo.map((item) => (
                  <ListItem key={item.primary}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.primary}
                      secondary={item.secondary}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Contact Form
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
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
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
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
