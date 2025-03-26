import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Heading,
  FormErrorMessage,
  Flex,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
import img2 from '../assets/img2.png'
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Updated to useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:4040/login', formData);

        if (response.status === 200) {
          alert(response.data.message);
          // Get the usertype from the response
          const userType = response.data.userType;

          // Navigate based on usertype
          if (userType === 'employer') {
            navigate("/employer-dashboard");
          } else if (userType === 'job_seeker') {
            navigate("/job-seeker-dashboard");
          } // Redirect to dashboard or homepage after successful login
        }
      } catch (error) {
        // Handle error responses from the backend
        if (error.response) {
          alert(error.response.data.error || 'An error occurred');
        } else {
          alert('An error occurred, please try again');
        }
      }
    }
  };

  return (
    <Flex minHeight="100vh">
      {/* Left Half (Background Image and Info) */}
      <Box
        width="50%"
        backgroundImage={img2} // Replace with your image URL
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        padding={6}
      >
        <Box textAlign="center" backgroundColor="rgba(0, 0, 0, 0.5)" padding={6} borderRadius="md">
          <Heading as="h3" size="lg" marginBottom={4}>
            Why Choose Us?
          </Heading>
          <List spacing={3} fontSize="lg">
            <ListItem>Secure and fast login</ListItem>
            <ListItem>Access to personalized content</ListItem>
            <ListItem>Seamless user experience</ListItem>
            <ListItem>Multiple features to explore</ListItem>
          </List>
        </Box>
      </Box>

      {/* Right Half (Login Form) */}
      <Box
        width="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={8}
        backgroundColor="gray.50"
      >
        <Box
          borderWidth={1}
          borderRadius="lg"
          p={6}
          boxShadow="lg"
          width="100%"
          maxWidth="400px"
        >
          <Heading as="h2" size="xl" textAlign="center" mb={6}>
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Email */}
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>

              {/* Password */}
              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
              </FormControl>

              <Button colorScheme="teal" width="full" type="submit">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default LoginPage;
