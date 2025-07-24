import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {
  Box,
  Heading,
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  Center,
  VStack,
} from "@chakra-ui/react";
import { Loader2, GraduationCap } from "lucide-react";
import login from "../images/loginpage.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    role: "student",
  });

  //console.log(form)
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (form.age && (parseInt(form.age) < 13 || parseInt(form.age) > 120)) {
      newErrors.age = "Please enter a valid age (13–120)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage("");

    try {
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/user/register",
        data: form,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      setMessage(
        "Account created successfully! Welcome to our learning platform."
      );
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
        role: "student",
      });
      setTimeout(()=>{
        navigate("/login")
      },2000)
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
     minH="100vh"
           bgImage={`url(${login})`}
           bgSize="cover"
           bgPosition="center"
           bgRepeat="no-repeat"
           py={10}
           px={4}
    >
      <Center>
        <Box
          maxW="md"
          w="full"
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="xl"
        >
          {/* Header */}
          <Center mb={6}>
            <Box
              bg="blue.600"
              borderRadius="full"
              w={16}
              h={16}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <GraduationCap size={32} color="white" />
            </Box>
          </Center>
          <Heading textAlign="center" fontSize="2xl" mb={1} color="gray.800">
            Join SkillGate
          </Heading>
          <Text textAlign="center" color="gray.600" mb={6}>
            Start your learning journey today
          </Text>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch" color="gray.800">
              {/* Full Name */}
              <FormControl isInvalid={errors.name}>
                <FormLabel color="gray.700">Full Name *</FormLabel>
                <Input
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={isLoading}
                  color="gray.800"
                  _placeholder={{ color: "gray.400" }}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              {/* Email */}
              <FormControl isInvalid={errors.email}>
                <FormLabel color="gray.700">Email Address *</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                  color="gray.800"
                  _placeholder={{ color: "gray.400" }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              {/* Password */}
              <FormControl isInvalid={errors.password}>
                <FormLabel color="gray.700">Password *</FormLabel>
                <Input
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  disabled={isLoading}
                  color="gray.800"
                  _placeholder={{ color: "gray.400" }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              {/* Confirm Password */}
              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel color="gray.700">Confirm Password *</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  disabled={isLoading}
                  color="gray.800"
                  _placeholder={{ color: "gray.400" }}
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              {/* Age */}
              <FormControl isInvalid={errors.age}>
                <FormLabel color="gray.700">Age (Optional)</FormLabel>
                <Input
                  type="number"
                  placeholder="Your age"
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  disabled={isLoading}
                  color="gray.800"
                  _placeholder={{ color: "gray.400" }}
                />
                <FormErrorMessage>{errors.age}</FormErrorMessage>
              </FormControl>

              {/* Role */}
              <FormControl>
                <FormLabel color="gray.700">I am a...</FormLabel>
                <Select
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  disabled={isLoading}
                  color="gray.800"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </Select>
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
                spinner={<Loader2 className="animate-spin" size={16} />}
                mt={4}
              >
                Create Account
              </Button>

              {/* Success/Error Message */}
              {message && (
                <Alert
                  status={
                    message.includes("successfully") ? "success" : "error"
                  }
                >
                  <AlertIcon />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            </VStack>
          </form>

          {/* Footer */}
          <Text mt={6} fontSize="sm" textAlign="center" color="gray.600">
            Already have an account?{" "}
            <Box
              as="button"
              color="blue.600"
              fontWeight="medium"
              bg="none"
              border="none"
              cursor="pointer"
              _hover={{ color: "blue.500", textDecoration: "underline" }}
              onClick={() => navigate("/login")}
              p={0}
            >
              Sign in here
            </Box>
          </Text>

          <Text mt={4} fontSize="xs" textAlign="center" color="gray.500">
            By creating an account, you agree to our{" "}
            <Box as="a" href="#" textDecoration="underline">
              Terms of Service
            </Box>{" "}
            and{" "}
            <Box as="a" href="#" textDecoration="underline">
              Privacy Policy
            </Box>
          </Text>
        </Box>
      </Center>
    </Box>
  );
}
