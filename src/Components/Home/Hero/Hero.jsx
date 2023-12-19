import React from 'react'
import { Box, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { CustomBox, Title } from './Styles/Styles'
import CustomButton from '../../Button/CustomButton'
import img1 from '../../../assets/img/pose2.png'
import { Link } from 'react-router-dom'
import lotus from '../../../assets/img/lotus.png'

const Hero = () => {

    return (
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
                            Discover a life where you'll love to live.
                        </Title>
                        <Typography
                            variant="body2"
                            sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                        >
                            " Yoga is the journey of the self, through the self, to the self,

                            Yoga is not about touching your toes, it's about what you learn on the way down "
                        </Typography>

                        <div style={{ display: "flex", gap: "15px" }}>
                            <a href="#faq" style={{ textDecoration: 'none' }}>
                                <CustomButton
                                    backgroundColor="#009de9"
                                    color="#fff"
                                    buttonText="FAQs"
                                    heroBtn={true}
                                />
                            </a>

                            <Link to="/enroll" style={{ textDecoration: 'none' }}>
                                <CustomButton
                                    backgroundColor="#fff"
                                    color="#009de9"
                                    buttonText="Register Now"
                                    heroBtn={true}
                                />
                            </Link>
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
    )
}

export default Hero