import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Box,
  Button,
  Container,
  Collapse,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import { BATCH } from "../../assets/data";
import cx from "classnames";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/user";

const theme = createTheme();

export default function EnrolmentForm() {
  const history = useNavigate();
  const [checked, setChecked] = React.useState(true);

  const mockFormData = {
    firstName: "jhon",
    lastName: "doe",
    age: "20",
    gender: "male",
    phone: "9928392222",
    address: "pune",
    state: "maharashtra",
    city: "pune",
    batch: "morning",
    email: "demo@123.com",
    last_updated: "2023-12-10T12:00:00.000Z",
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    batch: "",
    email: "",
    last_updated: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const { profile } = useUser();
  const { enroll } = useUser();

  const validateForm = () => {
    const errors = {};

    // Age validation
    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 18 || age > 65) {
      errors.age = "Age must be between 18 and 65";
    }

    // Phone number validation
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }

    // Gender validation
    const validGenders = ["male", "female"];
    if (!validGenders.includes(formData.gender.toLowerCase())) {
      errors.gender = "Please select a valid gender";
    }

    // Display address validation
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }

    // State validation
    if (!formData.state.trim()) {
      errors.state = "State is required";
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    return errors;
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Perform form validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorMsg(
        "Please fix the following errors: " + Object.values(errors).join(", ")
      );
      return;
    }

    // Call the enroll function from user context
    try {
      const res = await enroll(formData);
      if (res.status === 200) {
        return history("/payment");
      }
    } catch (err) {
      if (err.response) {
        setErrorMsg(err.response.data.message || err.message);
      }
    } finally {
      setFormData({});
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const prefillForm = () => {
    fetch("/users/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.profile) {
          setFormData({
            ...formData,
            ...resData.profile,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (profile) {
      prefillForm();
    }
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
              <Collapse in={errorMsg?.length !== 0}>
                <Alert
                  severity="error"
                  variant="outlined"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrorMsg("");
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ my: 3 }}
                >
                  {errorMsg}
                </Alert>
              </Collapse>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    autoComplete="firstName"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    autoComplete="lastName"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="age"
                    value={formData.age || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    name="age"
                    label="Age"
                    fullWidth
                    autoComplete="age"
                    variant="standard"
                    error={errorMsg.includes("Age")}
                    helperText={
                      errorMsg.includes("Age")
                        ? "Age must be between 18 and 65"
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="gender"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    label="Gender"
                    fullWidth
                    autoComplete="gender"
                    variant="standard"
                    error={errorMsg.includes("gender")}
                    helperText={
                      errorMsg.includes("gender")
                        ? "Please select a valid gender"
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    fullWidth
                    autoComplete="phone"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    label="Current Address"
                    fullWidth
                    required
                    autoComplete="applicant address"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    value={formData.state || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    label="State/Province/Region"
                    required
                    fullWidth
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    value={formData.city || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    fullWidth
                    autoComplete="city"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    id="batch"
                    options={BATCH}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    onInputChange={(e, val) => {
                      handleInputChange("batch", val);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        autoComplete="title"
                        name="batch"
                        required
                        value={formData.batch || ""}
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                        variant="standard"
                        label="Select Batch"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />{" "}
                  I agree to the terms and conditions
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
