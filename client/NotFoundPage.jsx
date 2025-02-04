import React from "react"
import { Container, Typography, Button, Box, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import { keyframes } from "@mui/system"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ErrorIcon from "@mui/icons-material/Error" 
import HomeIcon from "@mui/icons-material/Home" 

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-30px); }
  100% { opacity: 1; transform: translateY(0); }
`

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFD700", 
    },
    background: {
      default: "#1c1c1c", 
    },
    text: {
      primary: "#ffffff", 
    },
  },
})

const NotFoundPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "background.default", 
          color: "text.primary", 
          animation: `${fadeIn} 1s ease-out`,
          textAlign: "center",
          borderRadius: "10px", 
          boxShadow: 3, 
        }}
      >
        <Box sx={{ mb: 4 }}>
          
          <ErrorIcon sx={{ fontSize: "8rem", color: "primary.main", animation: `${fadeIn} 1s ease-out` }} />
          
          <Typography
            variant="h1"
            sx={{
              fontSize: "6rem",
              fontWeight: "bold",
              color: "primary.main",
              letterSpacing: "5px",
              animation: `${fadeIn} 1.5s ease-out`,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.primary", 
              mb: 2,
              fontSize: "1.5rem",
              animation: `${fadeIn} 2s ease-out`,
            }}
          >
            Oops! Page not found.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.primary", 
              mb: 4,
              fontSize: "1.2rem",
              opacity: 0.8,
              animation: `${fadeIn} 2.5s ease-out`,
            }}
          >
            The page you are looking for does not exist or has been moved. Let's get you back to safety.
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              fontSize: "1.2rem",
              padding: "12px 24px",
              backgroundColor: "primary.main", 
              display: "flex",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#FFBF00", 
              },
              animation: `${fadeIn} 3s ease-out`,
            }}
          >
            <HomeIcon sx={{ mr: 1 }} />
            Go to Home
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default NotFoundPage
