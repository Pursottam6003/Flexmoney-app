import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";

const theme = createTheme();

export default function EnrolmentForm() {
  const [paid, setPaid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentAmount = 500;
      const res = await axios.post("/payments/pay", { paymentAmount });
      if (res.status !== 200) {
        throw new Error(res.statusText);
      } else {
        setPaid(true);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const checkPayment = async () => {
      try {
        const res = await axios.get("/payments/history");
        if (res.status !== 200) {
          throw new Error(res.statusText);
        } else {
          if (res.data.payments.length === 0) {
            setPaid(false);
            return;
          }
          const lastPaymentDate = res.data.payments[0].paymentDate;
          const currentMonth = new Date().getMonth();
          const lastPaymentMonth = lastPaymentDate.getMonth();

          if (currentMonth === lastPaymentMonth) {
            setPaid(true);
          } else {
            setPaid(false);
          }
        }
      } catch (err) {
        throw err;
      }
    };
    checkPayment();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container
          className="print-container"
          component="main"
          maxWidth="sm"
          sx={{ mb: 4 }}
        >
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Box mb={3}>
              <Box sx={{ mt: 1 }}>
                <img
                  width="100"
                  style={{ display: "block", margin: "auto" }}
                  height="100"
                  src="https://img.icons8.com/plasticine/100/guru.png"
                  alt="guru"
                />{" "}
              </Box>
              <Typography component="h1" variant="h4" align="center">
                Yoga Admission Form
              </Typography>

              <Typography
                component="h1"
                variant="h6"
                align="center"
                style={{ fontSize: "14px" }}
              >
                Please enter the details below and you will receive the payment
                link on your email id once you click on register. Charges: Rs
                500/month
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Alert severity="info" variant="outlined" sx={{ my: 3 }}>
                {paid
                  ? "You have made the payment for this month"
                  : "Complete payment Rs 500 to confirm your subscription for this month"}
              </Alert>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirm payment
              </Button>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
