import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const CreateCourseModal = ({ onClose, onSuccess, isOpen }) => {
  const [form, setForm] = useState({
    course: '',
    description: '',
    duration: '',
    price: '',
  });

  const toast = useToast();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://skillgate.onrender.com/course/create', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Course created', status: 'success', duration: 3000 });
      onSuccess();
      onClose();
    } catch (err) {
      toast({ title: 'Failed to create course', status: 'error', duration: 3000 });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Course</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="course"
            placeholder="Course Name"
            value={form.course}
            onChange={handleChange}
            mb={3}
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            mb={3}
          />
          <Input
            name="duration"
            placeholder="Duration"
            value={form.duration}
            onChange={handleChange}
            mb={3}
          />
          <Input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            type="number"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={handleSubmit}>Submit</Button>
          <Button onClick={onClose} ml={3}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCourseModal;
