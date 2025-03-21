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
  RadioGroup,
  Radio,
  HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Updated to useNavigate
import img1 from '../assets/img1.png'


function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    field: "",
    userType: "",
    password: "",
    confirmPassword: "",
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
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.contact) formErrors.contact = "Contact number is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.field) formErrors.field = "Field is required";
    if (!formData.userType) formErrors.userType = "User Type is required";
    if (!formData.password) formErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Passwords must match";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // For now, you can replace this with an API call to create the user
      alert("Signup successful");
      navigate("/login"); // Redirect to login page after successful signup
    }
  };

  return (
    <Flex minHeight="100vh">
      {/* Left Half (Background Image and Info) */}
      <Box
        width="50%"
        backgroundImage={img1} // Replace with your image URL
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
            Why Join Us?
          </Heading>
          <List spacing={3} fontSize="lg">
            <ListItem>Easy sign up process</ListItem>
            <ListItem>Access personalized job opportunities</ListItem>
            <ListItem>Find the right employer or job seeker</ListItem>
            <ListItem>Get updates and notifications</ListItem>
          </List>
        </Box>
      </Box>

      {/* Right Half (Signup Form) */}
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
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Name */}
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
                {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
              </FormControl>

              {/* Contact */}
              <FormControl isInvalid={errors.contact}>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                />
                {errors.contact && <FormErrorMessage>{errors.contact}</FormErrorMessage>}
              </FormControl>

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

              {/* Field */}
              <FormControl isInvalid={errors.field}>
                <FormLabel>Field</FormLabel>
                <Input
                  type="text"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  placeholder="Enter your field"
                />
                {errors.field && <FormErrorMessage>{errors.field}</FormErrorMessage>}
              </FormControl>

              {/* User Type (Radio Buttons for Job Seeker / Employer) */}
              <FormControl isInvalid={errors.userType}>
                <FormLabel>User Type</FormLabel>
                <RadioGroup
                  name="userType"
                  value={formData.userType}
                  onChange={(value) =>
                    setFormData((prevData) => ({ ...prevData, userType: value }))
                  }
                >
                  <HStack spacing={4}>
                    <Radio value="job_seeker">Job Seeker</Radio>
                    <Radio value="employer">Employer</Radio>
                  </HStack>
                </RadioGroup>
                {errors.userType && <FormErrorMessage>{errors.userType}</FormErrorMessage>}
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

              {/* Confirm Password */}
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
              </FormControl>

              <Button colorScheme="teal" width="full" type="submit">
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignUpPage;
