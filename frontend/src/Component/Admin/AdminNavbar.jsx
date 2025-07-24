// src/Component/Admin/AdminNavbar.js
import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { FaUserShield, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDetail = localStorage.getItem("user");
  const { name, email, role } = JSON.parse(userDetail || "{}");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const bg = useColorModeValue("white", "gray.900");

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
            <Box bg="teal.600" p={2} borderRadius="lg">
              <FaUserShield color="white" />
            </Box>
            <Text
              fontWeight="bold"
              fontSize="xl"
              bgGradient="linear(to-r, teal.600, teal.300)"
              bgClip="text"
            >
              SkillGate - Admin
            </Text>
          </HStack>
        </HStack>

        {/* Right Section */}
        <HStack spacing={3}>
          <Menu>
            <MenuButton>
              <Avatar size="md" name={name} bg="teal.500" />
            </MenuButton>
            <MenuList>
              <VStack align="start" p={3}>
                <HStack>
                  <Avatar size="sm" bg="teal.500" icon={<FaUser />} />
                  <Box>
                    <Text fontWeight="medium">{name || "Admin"}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {role || "Admin"}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
              <MenuItem icon={<FaUser />} onClick={() => navigate("/profile")}>
                Profile
              </MenuItem>
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

      {/* Sidebar Drawer */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Admin Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start" mt={4}>
              <Box
                onClick={() => {
                  navigate("/admin");
                  onClose();
                }}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                Dashboard
              </Box>
              <Box
                onClick={() => {
                  navigate("/verifyUser");
                  onClose();
                }}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                Verify Users
              </Box>
              <Box
                onClick={() => {
                  navigate("/instructorDashboard");
                  onClose();
                }}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                Update All Courses
              </Box>
              <Box
                onClick={() => {
                  navigate("/annoucement");
                  onClose();
                }}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                Announcements
              </Box>
              <Box
                onClick={() => {
                  navigate("/profile");
                  onClose();
                }}
                cursor="pointer"
                _hover={{ color: "teal.500" }}
              >
                Profile
              </Box>
              <Box onClick={handleLogout} color="red.500" cursor="pointer">
                Logout
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AdminNavbar;
