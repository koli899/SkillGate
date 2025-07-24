import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  useToast,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import moment from "moment";
import AdminNavbar from "./AdminNavbar";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const toast = useToast();
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("https://skillgate.onrender.com/announcement/all");
      setAnnouncements(res.data.announcements || []);
    } catch (error) {
      toast({ title: "Failed to fetch", status: "error" });
    }
  };

  const handleCreateOrUpdate = async () => {
    if (!title.trim()) {
      toast({ title: "Title is required", status: "warning" });
      return;
    }

    const payload = {
      title: title.trim(),
      description: desc.trim(),
      date: new Date(),
    };

    try {
      let response;
      if (editId) {
        response = await axios.patch(
          `https://skillgate.onrender.com/announcement/update/${editId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        response = await axios.post(
          "https://skillgate.onrender.com/announcement/create",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      if (response.status === 200 || response.status === 201) {
        setTitle("");
        setDesc("");
        setEditId(null);
        onClose();
        // Fetch announcements and only show toast after successful update
        fetchAnnouncements();
        toast({
          title: editId ? "Announcement updated" : "Announcement created",
          status: "success",
        });
      }
    } catch (error) {
      // Only show error toast if the request failed
      if (!error.response || (error.response.status !== 200 && error.response.status !== 201)) {
        toast({
          title: "Operation failed",
          description: error.response?.data?.message || error.message,
          status: "error",
        });
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://skillgate.onrender.com/announcement/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Announcement deleted", status: "success" });
      fetchAnnouncements();
    } catch (error) {
      toast({ title: "Delete failed", status: "error" });
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDesc(item.description);
    setEditId(item._id);
    onOpen();
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <Box minH="100vh" w="100vw" overflowX="hidden" bg="gray.50">
      <AdminNavbar />
      <Flex direction="column" align="center" pt={8} px={0} w="100vw">
        <Flex
          w="100vw"
          maxW="100vw"
          justify="space-between"
          align="center"
          mb={6}
          px={{ base: 4, md: 10 }}
        >
          <Heading>Manage Announcements</Heading>
          <Button
            colorScheme="blue"
            onClick={() => {
              setEditId(null);
              setTitle("");
              setDesc("");
              onOpen();
            }}
          >
            Create Announcement
          </Button>
        </Flex>

        <Box
          w="100vw"
          maxW="100vw"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={{ base: 4, md: 8 }}
        >
          <Heading size="md" mb={4}>
            All Announcements
          </Heading>
          <VStack spacing={4} align="stretch">
            {announcements.length === 0 && <Text>No announcements found</Text>}
            {announcements.map((item) => (
              <Box
                key={item._id}
                w="100%"
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
                bg="gray.50"
              >
                <Flex
                  justify="space-between"
                  align="start"
                  flexDir={{ base: "column", sm: "row" }}
                >
                  <Box>
                    <Text fontWeight="bold" color="teal.600">
                      {item.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {item.description}
                    </Text>
                    <Text fontSize="xs" mt={1} color="gray.500">
                      {moment(item.date).format("D MMM YYYY, h:mm A")}
                    </Text>
                  </Box>

                  <HStack spacing={2} mt={{ base: 3, sm: 0 }}>
                    <IconButton
                      icon={<Edit size={18} />}
                      onClick={() => handleEdit(item)}
                      aria-label="Edit"
                    />
                    <IconButton
                      icon={<Trash2 size={18} />}
                      onClick={() => handleDelete(item._id)}
                      colorScheme="red"
                      aria-label="Delete"
                    />
                  </HStack>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>

      {/* Modal for Create/Update Announcement */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editId ? "Update Announcement" : "Create Announcement"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Announcement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Description (optional)"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateOrUpdate}>
              {editId ? "Update" : "Create"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Announcements;
