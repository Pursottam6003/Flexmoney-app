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