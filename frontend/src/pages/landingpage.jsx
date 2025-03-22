// src/LandingPage.js
import React from 'react';
import { Button, Box, Container, Heading, Stack, Text, Image, VStack, HStack, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo1 from '../assets/img1.png'
import logo2 from '../assets/img2.png'

const LandingPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      {/* Section 1: Logo and Motto */}
      <VStack spacing={8} align="center" mb={16}>
        <Image
          src={logo1} // Replace with your logo image path
          alt="JobHub Logo"
          boxSize="550px"
          objectFit="contain"
        />
        <Heading fontSize="3xl" fontWeight="bold">
          JobHub: Your Career Compass
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Connecting talent with opportunity, empowering careers.
        </Text>
      </VStack>

      <Divider mb={10} />

      {/* Section 2: About Us */}
      <Box mb={16}>
        <Heading fontSize="2xl" mb={6} textAlign="center">
          About JobHub
        </Heading>
        <Stack spacing={6} direction={{ base: 'column', md: 'row' }}>
          <Box flex={1}>
            <Text fontSize="md" color="gray.700">
              JobHub is a platform dedicated to simplifying the job search process. We believe everyone deserves to find a fulfilling career. Our mission is to provide a seamless and efficient experience for job seekers and employers alike.
            </Text>
            <Text fontSize="md" color="gray.700" mt={4}>
              Our platform offers a wide range of job listings across various industries, along with tools and resources to help you succeed in your career journey. Whether you're a recent graduate or a seasoned professional, JobHub is here to support you.
            </Text>
          </Box>
          <Box flex={1}>
            <Image
              src={logo2}// Replace with your about us image path
              alt="About Us"
              borderRadius="md"
              boxSize="100%"
              objectFit="cover"
            />
          </Box>
        </Stack>
      </Box>

      <Divider mb={10}/>

      {/* Section 3: How to Join the Team */}
      <Box textAlign="center">
        <Heading fontSize="2xl" mb={6}>
          Join Our Team
        </Heading>
        <Text fontSize="md" color="gray.700" mb={8}>
          Interested in joining our dynamic team and helping us shape the future of job searching?
        </Text>
        <HStack spacing={4} justify="center">
          <Link to="/signup">
            <Button colorScheme="teal" size="lg">
              Sign Up as a Job Seeker
            </Button>
          </Link>
          <Link to="/signup?type=employer">
            <Button colorScheme="blue" size="lg">
              Sign Up as an Employer
            </Button>
          </Link>
        </HStack>
        <Text fontSize="sm" color="gray.500" mt={4}>
            Already have an account? <Link to="/login" style={{color:"blue"}}>Login</Link>
        </Text>
      </Box>
    </Container>
  );
};

export default LandingPage;