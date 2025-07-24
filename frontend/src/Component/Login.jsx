import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  Center,
  VStack,
} from "@chakra-ui/react";
import { Loader2, GraduationCap } from "lucide-react";
import axios from "axios";
import login from "../images/loginpage.jpg"; // ✅ Use correct relative path

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
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
      const response = await axios.post("http://localhost:8000/user/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, user } = response.data;

      if (!user) throw new Error("Invalid user response");

      if (user.role === "instructor" && !user.isVerified) {
        setMessage("Your instructor account is not verified yet.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful! Welcome back.");
      setForm({ email: "", password: "" });

      setTimeout(() => {
        if (user.role === "student") navigate("/student");
        else if (user.role === "instructor") navigate("/instructor");
        else if (user.role === "admin") navigate("/admin");
      }, 1000);
    } catch (error) {
      setMessage("Login failed. Please check your credentials.");
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
          bg="whiteAlpha.900"
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
        >
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
            Welcome Back
          </Heading>
          <Text textAlign="center" color="gray.600" mb={6}>
            Sign in to your SkillGate account
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch" color="gray.800">
              <FormControl isInvalid={errors.email}>
                <FormLabel color="gray.700">Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={isLoading}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel color="gray.700">Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  disabled={isLoading}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
                spinner={<Loader2 className="animate-spin" size={16} />}
                mt={4}
              >
                Sign In
              </Button>

              {message && (
                <Alert
                  status={message.includes("successful") ? "success" : "error"}
                >
                  <AlertIcon />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
            </VStack>
          </form>

          <Text mt={6} fontSize="sm" textAlign="center" color="gray.600">
            Don't have an account?{" "}
            <Box
              as="button"
              color="blue.600"
              fontWeight="medium"
              bg="none"
              border="none"
              cursor="pointer"
              _hover={{ color: "blue.500", textDecoration: "underline" }}
              onClick={() => navigate("/register")}
              p={0}
            >
              Register here
            </Box>
          </Text>
        </Box>
      </Center>
    </Box>
  );
}
