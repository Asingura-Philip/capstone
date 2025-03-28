import React from 'react';
import { Box, Flex, HStack, Button, IconButton, useDisclosure, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const DashNavbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Post a Job', path: '/post-job' },
    { label: 'Applications', path: '/applications' },
    { label: 'Profile', path: '/profile' }
  ];

  return (
    <Box as="header" w="full" bg="teal.500" color="white">
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        mx="auto"
        p={4}
        direction={{ base: 'column', md: 'row' }}
      >
        {/* Logo */}
        <Text fontSize="xl" fontWeight="bold" letterSpacing="wide">
         Dashboard
        </Text>

        {/* Desktop Menu */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              variant="link"
              color="white"
              _hover={{ textDecoration: 'underline' }}
              as={Link}
              to={link.path}
            >
              {link.label}
            </Button>
          ))}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          variant="ghost"
          color="white"
          onClick={onToggle}
          display={{ md: 'none' }}
        />
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box display={{ md: 'none' }} p={4}>
          <Stack as="nav" spacing={4}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="link"
                color="teal.500"
                _hover={{ textDecoration: 'underline' }}
                as={Link}
                to={link.path}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default DashNavbar;
