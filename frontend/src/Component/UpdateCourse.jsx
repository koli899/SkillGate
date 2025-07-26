import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';

const UpdateCourseModal = ({ course, isOpen, onClose }) => {
  const [form, setForm] = useState(course);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const token = localStorage.getItem('token');
const Base_url= import.meta.env.VITE_BASE_URL
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${Base_url}/course/updateCourse/${course._id}`,
        {
          course: form.course,
          description: form.description,
          duration: form.duration,
          price: form.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        toast({
          title: 'Course Updated',
          description: 'The course has been successfully updated.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Update local course object directly
        Object.assign(course, form);
        onClose();
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      toast({
        title: 'Update Failed',
        description:
          error.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const modalSize = useBreakpointValue({ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl" boxShadow="2xl" px={{ base: 4, md: 8 }} py={6}>
        <ModalHeader textAlign="center">
          <Heading fontSize={{ base: 'lg', md: '2xl' }}>Update Course</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Course Title</FormLabel>
              <Input
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="Enter course name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter course description"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g., 3 months"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price (INR)</FormLabel>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g., 9999"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="space-between" pt={6}>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Updating"
            width={{ base: '100%', sm: 'auto' }}
          >
            Update
          </Button>
          <Button onClick={onClose} colorScheme="gray" width={{ base: '100%', sm: 'auto' }}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCourseModal;

