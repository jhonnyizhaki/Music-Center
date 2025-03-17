import React from "react"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
} from "@mui/material"
import { ExpandMore } from "@mui/icons-material"

const FAQ = () => {
  const faqs = [
    {
      question: "What types of instruments do you sell?",
      answer:
        "We offer a wide range of instruments including guitars, pianos, drums, wind instruments, and more. All our instruments are carefully selected from top manufacturers.",
    },
    {
      question: "Do you offer instrument rentals?",
      answer:
        "Yes, we provide instrument rental services for various periods. This is perfect for beginners or those wanting to try out an instrument before purchasing.",
    },
    {
      question: "How can I book a practice room?",
      answer:
        "Practice rooms can be booked through our website, by phone, or in person. We offer flexible booking times and various room sizes to suit your needs.",
    },
    {
      question: "What are your lesson rates?",
      answer:
        "Lesson rates vary depending on the instrument and duration. We offer both private and group lessons. Contact us for detailed pricing information.",
    },
    {
      question: "Do you offer instrument repairs?",
      answer:
        "Yes, we have experienced technicians who can repair and maintain various musical instruments. Contact us for a consultation and quote.",
    },
  ]

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        <h1>Frequently Asked Questions</h1>
      </Typography>
      <Box sx={{ mt: 4 }}>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  )
}

export default FAQ
