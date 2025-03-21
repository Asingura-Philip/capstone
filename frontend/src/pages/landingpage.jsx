// src/LandingPage.js
import React from 'react';
import { Button, Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // If using React Router for navigation

const LandingPage = () => {
  return (
    <Container centerContent>
      <Box textAlign="center" py={12} px={6}>
        <Heading fontSize="4xl" mb={4}>
          Welcome to JobHub
        </Heading>
        <Text fontSize="lg" color="gray.500" mb={8}>
          Find the best job opportunities and take the next step in your career!
        </Text>
        <Stack spacing={4} direction="column" align="center">
          <Link to="/signup">
            <Button colorScheme="teal" size="lg" width="200px">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button colorScheme="blue" size="lg" width="200px">
              Login
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default LandingPage;
