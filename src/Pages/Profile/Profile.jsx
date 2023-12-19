import React from 'react'
import { Box, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { CustomBox, Title } from '../../Components/Home/Hero/Styles/Styles'
import CustomButton from '../../Components/Button/CustomButton'
import img1 from '../../assets/img/pose2.png'


import { Link } from 'react-router-dom'
const Profile = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
        <Container>
          <CustomBox>
            <Box sx={{ flex: "1" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "18px",
                  color: "#687690",
                  fontWeight: "500",
                  mt: 5,
                  mb: 5,
                }}
              >
                Welcome to  Moksh Yoga Classes
              </Typography>
              <Title variant="h1">
                Welcome User
              </Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Your profile is incomplete please complete your profile to get started
              </Typography>

              <div style={{ display: "flex", gap: "15px" }}>


              </div>
            </Box>
            <Box sx={{ flex: "0.3" }}>
              <div className="yogagirl">
                <div className="devi">
                  {/* <img src={lotus} style={{ width: '260px' }} /> */}
                </div>
                <div className="yogdevifooter">

                </div>
              </div>
            </Box>
            <Box sx={{ flex: "0.3" }}>
              <img
                src={img1}
                alt="img1"
                style={{ maxWidth: "100%", marginBottom: "2.4rem" }}
              />
            </Box>


          </CustomBox>
        </Container>
      </Box>
    </>
  )
}

export default Profile