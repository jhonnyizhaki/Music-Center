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
      showNotification("ההודעה נשלחה בהצלחה!", "success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      showNotification("אירעה שגיאה בשליחת ההודעה", "error")
    }
  }

  const contactInfo = [
    {
      icon: <Phone />,
      primary: "טלפון",
      secondary: "03-1234567",
    },
    {
      icon: <Email />,
      primary: "אימייל",
      secondary: "info@musiccenter.com",
    },
    {
      icon: <LocationOn />,
      primary: "כתובת",
      secondary: "רחוב המוזיקה 123, תל אביב",
    },
    {
      icon: <AccessTime />,
      primary: "שעות פעילות",
      secondary: "ראשון-חמישי: 9:00-21:00, שישי: 9:00-14:00",
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        צור קשר
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        textAlign="center"
        paragraph
      >
        נשמח לעמוד לרשותכם בכל שאלה או בקשה
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                פרטי התקשרות
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
                טופס יצירת קשר
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="שם מלא"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="אימייל"
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
                  label="נושא"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="הודעה"
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
                  שלח הודעה
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
