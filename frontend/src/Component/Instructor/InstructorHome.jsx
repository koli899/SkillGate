import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Flex,
  Text,
  VStack,
  useToast,
  Heading,
  HStack,
  Icon,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaChalkboardTeacher } from "react-icons/fa";
import InstructorNav from "./InstructorNav";

const InstructorHome = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchAllCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/course/all");
      setAllCourses(res.data.courses);
    } catch (error) {
      toast({ title: "Failed to fetch courses", status: "error" });
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:8000/announcement/all");
      setAnnouncements(res.data.announcements || []);
    } catch (error) {
      toast({ title: "Failed to fetch announcements", status: "error" });
    }
  };

  useEffect(() => {
    fetchAllCourses();
    fetchAnnouncements();
  }, []);

  return (
    <Flex direction="column" h="100vh" w="100vw" bg="gray.50" overflow="hidden">
      <InstructorNav onSearch={setSearchQuery} />
      <Flex
        direction={{ base: "column", lg: "row" }}
        flex="1"
        px={{ base: 3, md: 6 }}
        py={4}
        gap={6}
        overflow="hidden"
      >
        {/* Course Snapshot (Admin style) */}
        <Box
          flex="3"
          bg="white"
          borderRadius="lg"
          p={5}
          boxShadow="md"
          overflowY="auto"
          h="full"
        >
          <Heading size="md" mb={4}>
            Course Snapshot
          </Heading>
          {allCourses.filter((course) =>
            course.course?.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 ? (
            <Text>No courses found.</Text>
          ) : (
            <VStack spacing={4} align="stretch">
              {allCourses
                .filter((course) =>
                  course.course?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((course) => (
                  <Flex
                    key={course._id}
                    p={4}
                    bg="gray.100"
                    borderRadius="md"
                    gap={4}
                    align="center"
                    direction={{ base: "column", md: "row" }}
                  >
                    <Flex
                      bg="teal.100"
                      borderRadius="full"
                      p={4}
                      align="center"
                      justify="center"
                    >
                      <Icon as={FaChalkboardTeacher} boxSize={8} color="teal.600" />
                    </Flex>
                    <Box flex="1">
                      <Text fontSize="xl" fontWeight="bold" color="teal.700">
                        {course.course}
                      </Text>
                      <Text>{course.description}</Text>
                      <HStack mt={2} spacing={4} wrap="wrap">
                        <Text>
                          <strong>Duration:</strong> {course.duration}
                        </Text>
                        <Text>
                          <strong>Price:</strong> ₹{course.price}
                        </Text>
                      </HStack>
                      <Text mt={2}>
                        <strong>Created By:</strong> {course?.createdBy?.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Created on {moment(course.createdAt).format("DD MMM YYYY")}
                      </Text>
                    </Box>
                  </Flex>
                ))}
            </VStack>
          )}
        </Box>
        {/* Announcements Sidebar */}
        <Box
          flex="1"
          bg="white"
          borderRadius="lg"
          p={5}
          boxShadow="md"
          h="full"
          overflowY="auto"
          display={{ base: "none", lg: "block" }}
        >
          <Heading size="md" mb={4}>
            Announcements
          </Heading>
          <VStack spacing={3} align="stretch">
            {announcements.slice(0, 10).map((item) => (
              <Box
                key={item._id}
                p={3}
                bg="blue.50"
                borderRadius="md"
                boxShadow="sm"
                cursor="pointer"
                _hover={{ bg: "blue.100" }}
                onClick={() => { setSelectedAnnouncement(item); onOpen(); }}
              >
                <Text fontWeight="medium">{item.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {moment(item.date).format("D MMM, YYYY h:mm A")}
                </Text>
              </Box>
            ))}
          </VStack>
          <Text
            mt={4}
            textAlign="center"
            fontSize="sm"
            fontWeight="bold"
            color="blue.500"
            cursor="pointer"
          >
            VIEW ALL
          </Text>
          <Divider my={5} />
          <Box>
            <Heading size="md" mb={3}>
              What’s New?
            </Heading>
            <Box bg="gray.50" borderRadius="md" p={3} boxShadow="sm">
              <Text color="purple.600" fontWeight="semibold">
                Product Update | Get access to all platforms of Skill-Gate at one place!
              </Text>
              <Text fontSize="sm" color="gray.600">
                8 Apr, 2024 8:44 PM
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
      {/* Announcement Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedAnnouncement?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} px={5}>
            <Text fontSize="sm" color="gray.600" mb={3}>
              {moment(selectedAnnouncement?.date).format("D MMM, YYYY h:mm A")}
            </Text>
            <Text fontSize="md">
              {selectedAnnouncement?.description || "No description available."}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default InstructorHome;
