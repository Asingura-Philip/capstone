import { Button, Container, Flex, HStack, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={10}
      as="nav"
      w="100%"
      boxShadow="md"
      borderRadius="lg"
      backgroundColor="white"
      p={4}
    >
      <Container maxW="1140px">
        <Flex h={16} alignItems="center" justifyContent="space-between" wrap="wrap">
          <Flex alignItems="center" justify="flex-start">
            <Link to="/">
              <Image src={logo} alt="Company Logo" boxSize="70px" borderRadius="full" />
            </Link>
          </Flex>

          <HStack spacing={6} alignItems="center" justifyContent={{ base: "center", md: "flex-end" }} w="auto">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="xl"
              fontWeight="bold"
              display={{ base: "none", md: "block" }}
            >
              Welcome
            </Text>
            <Link to="/login">
              <Button
                colorScheme="teal"
                variant="outline"
                px="6" // Adjust padding to control width
                py="4" // Adjust padding to control height
                fontSize="md" // Adjust font size as needed
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                colorScheme="pink"
                px="6" // Adjust padding to control width
                py="4" // Adjust padding to control height
                fontSize="md" // Adjust font size as needed
              >
                Signup
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default Navbar;