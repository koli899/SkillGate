import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Divider,
  Collapse,
} from '@chakra-ui/react';
import StudentNavbar from './Component/Students/navbar';
import axios from 'axios';
import AdminNavbar from './Component/Admin/AdminNavbar';
import InstructorNav from './Component/Instructor/InstructorNav';

const UserProfile = () => {
     const user = JSON.parse(localStorage.getItem('user'));
const Base_url= import.meta.env.VITE_BASE_URL
  const [isPasswordForm, setPasswordForm] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const toast = useToast();

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${Base_url}/user/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { name, email, age } = response.data.user;
      setProfile({
        name: name || '',
        email: email || '',
        age: age ? String(age) : '',
      });
    } catch (error) {
      toast({
        title: 'Failed to load profile',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${Base_url}/user/updateProfile`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: 'Profile updated!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${Base_url}/user/updatePassword`, passwords, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: 'Password updated!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setPasswords({ oldPassword: '', newPassword: '' });
      setPasswordForm(false);
    } catch (error) {
      toast({
        title: 'Failed to update password',
        description: error.response?.data?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
        {user?.role === "admin" ? (
  <AdminNavbar />
) : user?.role === "instructor" ? (
  <InstructorNav />
) : (
  <StudentNavbar/>
)}
      <Flex justify="center" align="start" py={10} px={4} minH="100vh" bg="gray.50">
        <Box
          w={{ base: '100%', md: '600px' }}
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading size="lg" mb={6} textAlign="center" color="teal.600">
             Profile
          </Heading>
          <form onSubmit={handleProfileSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={profile.name}
                  onChange={handleProfileChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={profile.age}
                  onChange={handleProfileChange}
                />
              </FormControl>
              <Button colorScheme="teal" type="submit" width="full">
                Update Profile
              </Button>
            </VStack>
          </form>
          <Divider my={6} />
          <Button
            variant="outline"
            colorScheme="teal"
            width="full"
            onClick={() => setPasswordForm((prev) => !prev)}
          >
            {isPasswordForm ? 'Cancel Password Update' : 'Update Password'}
          </Button>
          <Collapse in={isPasswordForm} animateOpacity>
            <form onSubmit={handlePasswordSubmit}>
              <VStack spacing={4} mt={6}>
                <FormControl isRequired>
                  <FormLabel>Old Password</FormLabel>
                  <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Enter old password"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </FormControl>
                <Button colorScheme="teal" type="submit" width="full">
                  Change Password
                </Button>
              </VStack>
            </form>
          </Collapse>
        </Box>
      </Flex>
    </>
  );
};

export default UserProfile;
