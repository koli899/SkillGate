import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  Heading,
  Badge,
  Flex,
} from '@chakra-ui/react';
import AdminNavbar from './AdminNavbar';

const AdminVerify = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:8000/user/getAllUsers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredUsers = (res.data.users || []).filter(
        (user) => user.role !== 'admin'
      );
      setUsers(filteredUsers);
    } catch (error) {
      toast({
        title: 'Failed to fetch users',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(
        `http://localhost:8000/user/VerifyUser/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: 'User verified successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Verification failed',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/user/deleteUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: 'User deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Deletion failed',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <Box px={{ base: 4, md: 10 }} py={6} w="100%" overflowX="auto">
        <Heading mb={6} textAlign="center" fontSize={{ base: 'xl', md: '2xl' }}>
          Admin Dashboard - User Verification
        </Heading>

        {loading ? (
          <Flex justify="center" align="center" minH="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <Table variant="striped" colorScheme="gray" size="md">
            <Thead bg="gray.100">
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Age</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.age}</Td>
                  <Td>
                    <Badge colorScheme="purple">{user.role}</Badge>
                  </Td>
                  <Td>
                    {user.isVerified ? (
                      <Badge colorScheme="green">Verified</Badge>
                    ) : (
                      <Badge colorScheme="red">Not Verified</Badge>
                    )}
                  </Td>
                  <Td>
                    <Flex
                      direction={{ base: 'column', sm: 'row' }}
                      gap={2}
                      flexWrap="wrap"
                    >
                      {!user.isVerified && (
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => handleVerify(user._id)}
                        >
                          Verify
                        </Button>
                      )}
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default AdminVerify;

