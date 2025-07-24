import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  useToast,
  Flex,
  Badge,
  Collapse,
  IconButton,
  VStack,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import AdminNavbar from './Admin/AdminNavbar';
import InstructorNav from './Instructor/InstructorNav';
import StudentNavbar from './Students/navbar';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updateCourseModal, setUpdateCourseModal] = useState({ open: false, course: null });
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [lessons, setLessons] = useState({});
  const [addLessonModal, setAddLessonModal] = useState({ open: false, courseId: null });
  const [newLesson, setNewLesson] = useState({ title: '', summary: '' });
  const [editLessonModal, setEditLessonModal] = useState({ open: false, lesson: null, courseId: null });
  const [editLesson, setEditLesson] = useState({ title: '', summary: '' });
  const [lessonModal, setLessonModal] = useState({ open: false, lesson: null });
  const toast = useToast();

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose } = useDisclosure();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/course/yourCourses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.courses || []);
    } catch (err) {
      toast({ title: 'Failed to fetch courses', status: 'error', duration: 3000, isClosable: true });
    }
  };

  // Move these handlers to top-level scope
  const handleOpenUpdateCourse = async (course) => {
    try {
      const res = await axios.get(`http://localhost:8000/course/${course._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedCourse(res.data.course || course);
      setUpdateCourseModal({ open: true, course: res.data.course || course });
    } catch (err) {
      toast({ title: 'Failed to fetch course details', status: 'error' });
      setSelectedCourse(course);
      setUpdateCourseModal({ open: true, course });
    }
  };

  const handleUpdateCourse = async (updatedFields) => {
    try {
      await axios.patch(
        `http://localhost:8000/course/updateCourse/${selectedCourse._id}`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: 'Course updated', status: 'success' });
      setUpdateCourseModal({ open: false, course: null });
      setSelectedCourse(null);
      fetchCourses();
    } catch (err) {
      toast({ title: err?.response?.data?.message || 'Failed to update course', status: 'error' });
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course and all its lessons?')) {
      try {
        await axios.delete(`http://localhost:8000/course/deleteCourse/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: 'Course and all lessons deleted', status: 'success' });
        fetchCourses();
      } catch (err) {
        toast({ title: 'Failed to delete course', status: 'error' });
      }
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const res = await axios.get(`http://localhost:8000/lesson/all/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // API returns { lessons: { ...course, lessons: [array] } }
      const lessonArr = Array.isArray(res.data.lessons?.lessons)
        ? res.data.lessons.lessons
        : [];
      const sortedLessons = lessonArr.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
      });
      setLessons((prev) => ({ ...prev, [courseId]: sortedLessons }));
    } catch (err) {
      toast({ title: 'Failed to fetch lessons', status: 'error' });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleExpandCourse = (courseId) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
    } else {
      setExpandedCourseId(courseId);
      fetchLessons(courseId);
    }
  };

  const handleAddLesson = async () => {
    if (!newLesson.title.trim() || !newLesson.summary.trim()) {
      toast({ title: 'Title and summary are required', status: 'warning' });
      return;
    }
    try {
      const courseId = addLessonModal.courseId;
      await axios.post(
        `http://localhost:8000/lesson/create/${courseId}`,
        { title: newLesson.title, summary: newLesson.summary },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: 'Lesson added', status: 'success' });
      setAddLessonModal({ open: false, courseId: null });
      setNewLesson({ title: '', summary: '' });
      setExpandedCourseId(courseId);
      fetchLessons(courseId);
    } catch (err) {
      toast({ title: err?.response?.data?.message || 'Failed to add lesson', status: 'error' });
    }
  };

  const handleOpenEditLesson = (lesson, courseId) => {
    setEditLesson({ title: lesson.title, summary: lesson.summary });
    setEditLessonModal({ open: true, lesson, courseId });
  };

  const handleUpdateLesson = async () => {
    try {
      await axios.patch(`http://localhost:8000/lesson/update/${editLessonModal.lesson._id}`, editLesson, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: 'Lesson updated', status: 'success' });
      setEditLessonModal({ open: false, lesson: null, courseId: null });
      fetchLessons(editLessonModal.courseId);
    } catch (err) {
      toast({ title: 'Failed to update lesson', status: 'error' });
    }
  };

  const handleDeleteLesson = async (lessonId, courseId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await axios.delete(`http://localhost:8000/lesson/delete/${lessonId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: 'Lesson deleted', status: 'success' });
        fetchLessons(courseId);
      } catch (err) {
        toast({ title: 'Failed to delete lesson', status: 'error' });
      }
    }
  };

  const canEdit = (course) => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    if (user.role === 'instructor' && (course?.createdBy === user?._id || course?.createdBy?._id === user?._id)) return true;
    return false;
  };

  return (
    <Box>
      {user?.role === 'admin' ? <AdminNavbar /> : user?.role === 'instructor' ? <InstructorNav /> : <StudentNavbar />}

      <Flex justify="space-between" align="center" p={5} flexWrap="wrap">
        <Heading fontSize="2xl">
          {user?.role === 'admin' ? 'Admin Dashboard' : 'Instructor Dashboard'}
        </Heading>
        <Button colorScheme="teal" onClick={onCreateOpen}>+ Create Course</Button>
      </Flex>

      <Stack spacing={6} px={5} pb={10}>
        {courses.map((course) => (
          <Box
            key={course._id}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p={4}
            bg="white"
          >
            <VStack align="start" spacing={2} w="100%">
              <Badge colorScheme="purple">Course Title</Badge>
              <Text fontWeight="bold" fontSize="xl">{course.course}</Text>
              <Badge colorScheme="blue">Description</Badge>
              <Text noOfLines={2}>{course.description}</Text>
              <Text><strong>Duration:</strong> {course.duration}</Text>
              <Text><strong>Price:</strong> ₹{course.price}</Text>

              <Flex w="100%" justify="space-between" align="center" gap={2} flexWrap="wrap">
                <Button size="sm" colorScheme="teal" onClick={() => setAddLessonModal({ open: true, courseId: course._id })} isDisabled={!canEdit(course)}>
                  + Add Lesson
                </Button>
                <Button size="sm" colorScheme="yellow" onClick={() => handleOpenUpdateCourse(course)} isDisabled={!canEdit(course)}>
                  Update
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteCourse(course._id)} isDisabled={!canEdit(course)}>
                  Delete
                </Button>
                <IconButton
                  icon={expandedCourseId === course._id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  aria-label="Expand Lessons"
                  size="sm"
                  onClick={() => handleExpandCourse(course._id)}
                  variant="ghost"
                />
              </Flex>
      {/* Update Course Modal */}
      <Modal isOpen={updateCourseModal.open} onClose={() => { setUpdateCourseModal({ open: false, course: null }); setSelectedCourse(null); }} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                value={selectedCourse?.course || ''}
                onChange={e => setSelectedCourse({ ...selectedCourse, course: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Input
                value={selectedCourse?.description || ''}
                onChange={e => setSelectedCourse({ ...selectedCourse, description: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Duration</FormLabel>
              <Input
                value={selectedCourse?.duration || ''}
                onChange={e => setSelectedCourse({ ...selectedCourse, duration: e.target.value })}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={selectedCourse?.price || ''}
                onChange={e => setSelectedCourse({ ...selectedCourse, price: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={() => handleUpdateCourse({
              course: selectedCourse.course,
              description: selectedCourse.description,
              duration: selectedCourse.duration,
              price: selectedCourse.price
            })} isDisabled={!(selectedCourse?.course && selectedCourse?.description && selectedCourse?.duration && selectedCourse?.price)}>
              Update
            </Button>
            <Button onClick={() => { setUpdateCourseModal({ open: false, course: null }); setSelectedCourse(null); }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

              <Collapse in={expandedCourseId === course._id} animateOpacity style={{ width: '100%' }}>
                <Box mt={2} pl={2} borderLeft="2px solid #e2e8f0">
                  <Heading size="sm" mb={2}>Lessons</Heading>
                  {lessons[course._id]?.length > 0 ? (
                    <VStack align="stretch" spacing={2}>
                      {[...(lessons[course._id] || [])].reverse().map((lesson, idx) => (
                        <Box
                          key={lesson._id}
                          bg="gray.50"
                          p={3}
                          borderRadius="md"
                          boxShadow="sm"
                          cursor="pointer"
                          onClick={() => setLessonModal({ open: true, lesson })}
                        >
                          <HStack justify="space-between">
                            <Box>
                              <Text fontWeight="semibold">{idx + 1}. {lesson.title}</Text>
                              <Text fontSize="sm" color="gray.600" noOfLines={2}>{lesson.summary}</Text>
                            </Box>
                            {canEdit(course) && (
                              <HStack>
                                <Button size="xs" colorScheme="yellow" onClick={e => { e.stopPropagation(); handleOpenEditLesson(lesson, course._id); }}>Update</Button>
                                <Button size="xs" colorScheme="red" onClick={e => { e.stopPropagation(); handleDeleteLesson(lesson._id, course._id); }}>Delete</Button>
                              </HStack>
                            )}
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Text fontSize="sm" color="gray.500">No lessons yet.</Text>
                  )}
                </Box>
              </Collapse>
            </VStack>
          </Box>
        ))}
      </Stack>

      {/* Add and Edit Lesson Modals */}
      <Modal isOpen={addLessonModal.open} onClose={() => setAddLessonModal({ open: false, courseId: null })} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Lesson</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input value={newLesson.title} onChange={e => setNewLesson({ ...newLesson, title: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Summary</FormLabel>
              <Textarea
                value={newLesson.summary}
                onChange={e => setNewLesson({ ...newLesson, summary: e.target.value })}
                minH="100px"
                width="100%"
                resize="vertical"
                placeholder="Enter lesson summary..."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAddLesson} isDisabled={!newLesson.title || !newLesson.summary}>Add</Button>
            <Button onClick={() => setAddLessonModal({ open: false, courseId: null })}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={editLessonModal.open} onClose={() => setEditLessonModal({ open: false, lesson: null, courseId: null })} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Lesson</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input value={editLesson.title} onChange={e => setEditLesson({ ...editLesson, title: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Summary</FormLabel>
              <Textarea
                value={editLesson.summary}
                onChange={e => setEditLesson({ ...editLesson, summary: e.target.value })}
                minH="100px"
                width="100%"
                resize="vertical"
                placeholder="Enter lesson summary..."
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={handleUpdateLesson} isDisabled={!editLesson.title || !editLesson.summary}>Update</Button>
            <Button onClick={() => setEditLessonModal({ open: false, lesson: null, courseId: null })}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Lesson Full Details Modal */}
      <Modal isOpen={lessonModal.open} onClose={() => setLessonModal({ open: false, lesson: null })} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{lessonModal.lesson?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb={2}>Summary:</Text>
            <Text fontSize="md" whiteSpace="pre-wrap">{lessonModal.lesson?.summary}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      {isCreateOpen && <CreateCourse isOpen={isCreateOpen} onClose={onCreateClose} onSuccess={fetchCourses} />}
      {isUpdateOpen && selectedCourse && <UpdateCourse isOpen={isUpdateOpen} onClose={onUpdateClose} course={selectedCourse} onUpdate={fetchCourses} onDelete={fetchCourses} />}
    </Box>
  );
};

export default InstructorDashboard;