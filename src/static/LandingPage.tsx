import { Box, Container, Typography, Button } from "@mui/material";

const LandingPage = () => {
  return (
    <>
      <Container>
        <Box maxWidth="lg" sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#009688' }}>
            Welcome to Mitra Hospital
          </Typography>
          <Typography variant="h4" sx={{ color: '#1976D2', fontWeight: 600, mb: 2 }}>
            Your Health, Our Priority
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#555' }}>
            Providing comprehensive care with cutting-edge technology and compassionate service.
          </Typography>
          <Button variant="contained" color="primary" sx={{ padding: '12px 24px', fontSize: '1rem' }}>
            Book an Appointment
          </Button>
        </Box>

        {/* Image Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef"
            alt="Hospital"
            style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          />
        </Box>

        {/* Description Section */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
            Mitra Hospital offers state-of-the-art facilities to provide the best care for our patients. From urgent care to specialized treatments, our team of experts is here to guide you every step of the way.
          </Typography>
          <Typography variant="body2" sx={{ color: '#888' }}>
            With over 20 years of experience, Mitra Hospital is trusted by thousands of patients for its dedication to improving health outcomes.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default LandingPage;