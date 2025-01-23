import React from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material"
import {
  MusicNote,
  School,
  Store,
  MeetingRoom,
  Support,
} from "@mui/icons-material"

const About = () => {
  const features = [
    {
      icon: <Store sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Music Store",
      description:
        "Wide range of quality musical instruments for sale and rent",
    },
    {
      icon: <MusicNote sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Music Lessons",
      description: "Private and group lessons with professional teachers",
    },
    {
      icon: <MeetingRoom sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Practice Rooms",
      description: "Fully equipped practice rooms for rent with flexible hours",
    },
    {
      icon: <Support sx={{ fontSize: 40, color: "primary.main" }} />,
      title: "Professional Support",
      description: "Expert team available for any question or issue",
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          About Music Center
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your Place for Quality Music
        </Typography>
      </Box>

      <Grid container spacing={4} mb={6}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" paragraph>
            The Music Center was established in 2025 to provide a warm home for
            all music lovers. We believe that music is a universal language that
            connects people and cultures.
          </Typography>
          <Typography variant="body1" paragraph>
            Our professional team consists of experienced musicians and
            certified teachers, committed to providing the best experience for
            every customer.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
          <CardMedia
  component="img"
  height="300"
  image="./public/images/practice-room.png"
  alt="Music Center"
  sx={{
    transition: "transform 0.3s ease-in-out", 
    "&:hover": {
      transform: "scale(1.1)", 
    },
  }}
/>

          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h4" textAlign="center" mb={4}>
        השירותים שלנו
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card sx={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default About
