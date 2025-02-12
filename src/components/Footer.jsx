import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        py: 4,
        mt: 5,
      }}
    >
      <Container maxWidth="lg" >
        <Grid container spacing={4} justifyContent="center">
          {/* Logo & Description */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              CINESTREAM
            </Typography>
            <Typography variant="body2">
              The ultimate destination for movie lovers. Stream unlimited films anytime, anywhere.
            </Typography>
          </Grid>

          {/* Help & Support */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Link  color="inherit" underline="none" display="block">
              FAQ
            </Link>
            <Link  color="inherit" underline="none" display="block">
              Contact Us
            </Link>
            <Link  color="inherit" underline="none" display="block">
              Terms of Service
            </Link>
            <Link color="inherit" underline="none" display="block">
              Privacy Policy
            </Link>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={3} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }} gap={2}>
              <Link  color="inherit">
                <Facebook size={24} />
              </Link>
              <Link  color="inherit">
                <Instagram size={24} />
              </Link>
              <Link color="inherit">
                <Twitter size={24} />
              </Link>
              <Link  color="inherit">
                <Youtube size={24} />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" mt={3} pt={2} borderTop="1px solid #444">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} CineStream. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
