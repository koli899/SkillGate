import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Input,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useColorModeValue,
  Text,
  VStack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  Show,
} from '@chakra-ui/react';
import {
  SearchIcon,
  BellIcon,
  HamburgerIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import { FaUserGraduate, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentNavbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDetail = localStorage.getItem('user');
  const { name, email, role } = JSON.parse(userDetail || '{}');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const bg = useColorModeValue('white', 'gray.900');

  return (
    <Box
      bg={bg}
      position="sticky"
      top="0"
      zIndex="50"
      boxShadow="sm"
      borderBottom="1px"
      borderColor="gray.200"
      w="100%"
    >
      <Flex
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* Left Section */}
        <HStack spacing={4}>
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            aria-label="Toggle Menu"
            variant="ghost"
          />

          <HStack spacing={2}>
            <Box bg="teal.500" p={2} borderRadius="lg">
              <FaUserGraduate color="white" />
            </Box>
            <Text
              fontWeight="bold"
              fontSize="xl"
              bgGradient="linear(to-r, teal.500, teal.300)"
              bgClip="text"
            >
              SkillGate
            </Text>
          </HStack>
        </HStack>

        {/* Center Section - Desktop Search */}
        <Box
          flex="1"
          maxW="lg"
          mx={{ base: 2, md: 8 }}
          display={{ base: 'none', md: 'block' }}
        >
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
          {/* Mobile Search Icon */}
          <IconButton
            icon={<SearchIcon />}
            variant="ghost"
            display={{ base: 'inline-flex', md: 'none' }}
            aria-label="Search"
            onClick={() => document.getElementById('mobileSearch')?.focus()}
          />

          {/* Notification Bell */}
          <Box position="relative" display="inline-block">
            <IconButton
              icon={<BellIcon w={6} h={6} />}
              variant="ghost"
              aria-label="Notifications"
              size="md"
            />
            <Badge
              position="absolute"
              top="0"
              right="0"
              bg="red.500"
              color="white"
              borderRadius="full"
              fontSize="0.6em"
              px={1.5}
              py={0.5}
              lineHeight="1"
            >
              3
            </Badge>
          </Box>

          {/* Profile Menu */}
          <Menu>
            <MenuButton>
              <Avatar size="md" name={name} bg="teal.500" />
            </MenuButton>
            <MenuList>
              <VStack align="start" p={3}>
                <HStack>
                  <Avatar size="sm" bg="teal.500" icon={<FaUser />} />
                  <Box>
                    <Text fontWeight="medium">{name || 'Student'}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {role || 'Student'}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
              <MenuItem icon={<FaUser />} onClick={() => {
                  navigate('/profile');
                }}>Profile</MenuItem>
              <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
              <MenuItem
                icon={<FaSignOutAlt />}
                color="red.500"
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
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

      {/* Hamburger Menu Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start" mt={4}>
              <Box
                onClick={() => {
                  navigate('/student');
                  onClose();
                }}
                cursor="pointer"
                fontWeight={location.pathname === '/student' ? 'bold' : 'normal'}
                color={location.pathname === '/student' ? 'teal.600' : undefined}
                bg={location.pathname === '/student' ? 'teal.50' : undefined}
                px={2}
                py={1}
                borderRadius="md"
                _hover={{ color: 'teal.500', bg: 'teal.50' }}
              >
                 Dashboard
              </Box>
              <Box
                onClick={() => {
                  navigate('/enrolled');
                  onClose();
                }}
                cursor="pointer"
                fontWeight={location.pathname === '/enrolled' ? 'bold' : 'normal'}
                color={location.pathname === '/enrolled' ? 'teal.600' : undefined}
                bg={location.pathname === '/enrolled' ? 'teal.50' : undefined}
                px={2}
                py={1}
                borderRadius="md"
                _hover={{ color: 'teal.500', bg: 'teal.50' }}
              >
                 Enrolled Courses
              </Box>
              <Box
                onClick={() => {
                  navigate('/profile');
                  onClose();
                }}
                cursor="pointer"
                fontWeight={location.pathname === '/profile' ? 'bold' : 'normal'}
                color={location.pathname === '/profile' ? 'teal.600' : undefined}
                bg={location.pathname === '/profile' ? 'teal.50' : undefined}
                px={2}
                py={1}
                borderRadius="md"
                _hover={{ color: 'teal.500', bg: 'teal.50' }}
              >
                 Profile
              </Box>
              <Box
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  navigate('/login');
                  onClose();
                }}
                color="red.500"
                cursor="pointer"
                px={2}
                py={1}
                borderRadius="md"
                fontWeight="bold"
                _hover={{ bg: 'red.50' }}
              >
                 Logout
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default StudentNavbar;
