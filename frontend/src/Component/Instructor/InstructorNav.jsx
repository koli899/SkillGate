// src/Component/Instructor/InstructorNav.js
import React, { useState } from 'react';
import {
  Box, Flex, IconButton, Input, Avatar, Menu, MenuButton, MenuList, MenuItem,
  VStack, HStack, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerCloseButton, useDisclosure, Text, Show, useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons';
import { FaUserTie, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InstructorNav = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDetail = localStorage.getItem('user');
  const { name, email, role } = JSON.parse(userDetail || '{}');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const bg = useColorModeValue('white', 'gray.900');

  return (
    <Box bg={bg} position="sticky" top="0" zIndex="50" boxShadow="sm" borderBottom="1px" borderColor="gray.200" w="100%">
      <Flex px={{ base: 4, md: 6 }} py={3} align="center" justifyContent="space-between" flexWrap="wrap">
        {/* Left Section */}
        <HStack spacing={4}>
          <IconButton icon={<HamburgerIcon />} onClick={onOpen} aria-label="Toggle Menu" variant="ghost" />
          <HStack spacing={2}>
            <Box bg="purple.600" p={2} borderRadius="lg"><FaUserTie color="white" /></Box>
            <Text fontWeight="bold" fontSize="xl" bgGradient="linear(to-r, purple.600, purple.300)" bgClip="text">
              SkillGate - Instructor
            </Text>
          </HStack>
        </HStack>

        {/* Desktop Search */}
        <Box flex="1" maxW="lg" mx={{ base: 2, md: 8 }} display={{ base: 'none', md: 'block' }}>
          <Flex position="relative">
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              pl="10"
              bg="gray.100"
              border="none"
              _focus={{ bg: 'white' }}
            />
            <SearchIcon position="absolute" left="3" top="3" color="gray.500" />
          </Flex>
        </Box>

        {/* Right Section */}
        <HStack spacing={3}>
          <IconButton
            icon={<SearchIcon />}
            variant="ghost"
            display={{ base: 'inline-flex', md: 'none' }}
            aria-label="Search"
            onClick={() => document.getElementById('mobileSearch')?.focus()}
          />
          <Menu>
            <MenuButton><Avatar size="md" name={name} bg="purple.500" /></MenuButton>
            <MenuList>
              <VStack align="start" p={3}>
                <HStack>
                  <Avatar size="sm" bg="purple.500" icon={<FaUser />} />
                  <Box>
                    <Text fontWeight="medium">{name || 'Instructor'}</Text>
                    <Text fontSize="sm" color="gray.500">{role || 'Instructor'}</Text>
                  </Box>
                </HStack>
              </VStack>
              <MenuItem icon={<FaUser />} onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
              <MenuItem icon={<FaSignOutAlt />} color="red.500" onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Mobile Search Bar */}
      <Show below="md">
        <Box px={4} pb={3}>
          <Flex position="relative">
            <Input
              id="mobileSearch"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              pl="10"
              bg="gray.100"
              border="none"
            />
            <SearchIcon position="absolute" left="3" top="3" color="gray.500" />
          </Flex>
        </Box>
      </Show>

      {/* Sidebar Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Instructor Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start" mt={4}>
              <Box onClick={() => { navigate('/instructor'); onClose(); }} cursor="pointer" _hover={{ color: 'purple.500' }}>
                Dashboard
              </Box>
              <Box onClick={() => { navigate('/instructorDashboard'); onClose(); }} cursor="pointer" _hover={{ color: 'purple.500' }}>
                My Courses
              </Box>
              <Box onClick={() => { navigate('/profile'); onClose(); }} cursor="pointer" _hover={{ color: 'purple.500' }}>
                Profile
              </Box>
              <Box onClick={handleLogout} color="red.500" cursor="pointer">Logout</Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default InstructorNav;
