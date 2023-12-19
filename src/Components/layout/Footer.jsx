// import React from 'react'
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import HeartIcon from '@mui/icons-material/Favorite';

// import { Container, Box } from '@mui/system';
// import { Divider, Link, Typography } from '@mui/material';
// import Logo from '../../assets/img/img1.jpg';

// import { CustomContainer, IconBox, FooterLink } from "./Styles/Styles";
// import fbIcon from "../../assets/img/fbIcon.png"
// import twitterIcon from "../../assets/img/twitterIcon.png"
// // import twitterIcon from "../../assets/img/twittericon.png"
// import linkedinIcon from "../../assets/img/linkedinicon.png"


import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CustomContainer, IconBox, FooterLink } from './Styles/Styles'
import fbIcon from '../../assets/img/fbicon.png'
import twitterIcon from "../../assets/img/twittericon.png"
import linkedinIcon from "../../assets/img/linkedinicon.png"
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <Box sx={{ py: 10 }}>

            <CustomContainer sx={{
                borderTop: 1,
                borderColor: 'divider',
            }}>
                <CustomContainer>


                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "#1C1C1D",
                                fontWeight: "700",
                                mb: 2
                            }}
                        >
                            Resources
                        </Typography>

                        <FooterLink>
                            <Link to="https://www.healthline.com/nutrition/13-benefits-of-yoga">
                                Benefits
                            </Link>
                        </FooterLink>
                        <br />

                        <FooterLink>
                            <Link to="">
                                Stories
                            </Link>
                        </FooterLink>
                        <br />
                        <FooterLink>
                            <Link to="">
                                Video

                            </Link>
                        </FooterLink>
                        <br />
                        <FooterLink>
                            <Link to="">
                                Free Trial

                            </Link>
                        </FooterLink>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "#1C1C1D",
                                fontWeight: "700",
                                mb: 2,
                            }}
                        >
                            Company
                        </Typography>

                        <FooterLink>Partnerships</FooterLink>
                        <br />
                        <FooterLink>Terms of use</FooterLink>
                        <br />
                        <FooterLink>Privacy</FooterLink>
                        <br />
                        <FooterLink>Sitemap</FooterLink>
                    </Box>

                    <Box>
                        <Typography
                            sx={{
                                fontSize: "20px",
                                color: "#1C1C1D",
                                fontWeight: "700",
                                mb: 2,
                            }}
                        >
                            Get in touch
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "#7A7A7E",
                                fontWeight: "500",
                                mb: 2,
                            }}
                        >
                            Moksh Yog Foundation
                        </Typography>

                        <IconBox>
                            <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
                            <img
                                src={twitterIcon}
                                alt="twitterIcon"
                                style={{ cursor: "pointer" }}
                            />
                            <img
                                src={linkedinIcon}
                                alt="linkedinIcon"
                                style={{ cursor: "pointer" }}
                            />
                        </IconBox>
                    </Box>
                </CustomContainer>
            </CustomContainer>
        </Box >
    );
};

export default Footer;

/*
export function Footer() {
    return (
        <>
            <Box paddingY={3} sx={{
                backgroundColor: '#e7e7e7d9'
            }} className='app-footer'>
                <Container maxWidth='xl'>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: { xs: 'center', sm: 'space-between' },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <img src={Logo} style={{ height: "100px" }} alt=""></img>

                                {/* <Logo ftr={true}/> 
                                <Typography variant='subtitle1'>
                                    Alumni Association NIT Arunachal Pradesh
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                width: '100%',
                                justifyContent: { xs: 'center', sm: 'flex-start' },
                            }}>

                            </Box>
                        </Box>

                        <Box className='ListItems' sx={{ display: { md: 'block', xs: 'none' } }}>
                            <Typography variant='h6'>
                                Links
                            </Typography>
                            <ul className='lists'>
                                <li>
                                    <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                                        href=''>
                                        Alumni Association NIT AP
                                    </Link>
                                </li>
                                <li>
                                    <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                                        href='https://github.com/Pursottam6003/nitap_alumni'>
                                        Project Repository
                                    </Link>
                                </li>
                            </ul>
                        </Box>

                        <Box className='ListItems' sx={{ display: { md: 'block', xs: 'none' } }}>
                            <Typography variant='h6'>
                                Developers
                            </Typography>
                            <ul className='lists'>
                                <li>
                                    <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                                        href='https://github.com/tripathics/iocl-tracker/issues'>
                                        Report an Bug
                                    </Link>
                                </li>
                            </ul>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                width: '100%',
                                justifyContent: { xs: 'center', sm: 'flex-start' },
                            }}>
                                <TwitterIcon />
                                <GitHubIcon />
                                <FacebookIcon />
                            </Box>
                        </Box>

                        <Box className='ListItems' sx={{
                            marginRight: 8,
                            display: { sm: 'block', xs: 'none' }
                        }}>
                            <Typography variant='h6'>
                                Made with <HeartIcon sx={{ fontSize: '1.2rem', transform: 'translateY(2px)' }} /> by
                            </Typography>
                            <ul className='lists'>
                                <li>
                                    <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                                        href='https://github.com/tripathics'>
                                        Chandrashekhar Tripathi
                                    </Link>
                                </li>
                                <li>
                                    <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                                        href='https://github.com/pursottam6003'>
                                        Pursottam Sah
                                    </Link>
                                </li>

                                <li>
                                    <Link color='CaptionText' underline='hover' target='_blank' rel='noreferrer'
                                        href='https://github.com/daknya'>
                                        Daknya Bam
                                    </Link>
                                </li>
                            </ul>
                        </Box>
                    </Box>


                    <Divider sx={{
                        borderColor: 'rgba(0, 0, 0, 0.24)',
                        margin: '0.5rem 0',
                    }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant='caption'>
                            © 2023-Present, NIT Arunachal Pradesh.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>

    )
}

export default Footer;

*/