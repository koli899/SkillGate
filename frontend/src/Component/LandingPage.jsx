import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Avatar,
  Divider,
  HStack,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  FaUserShield,
  FaLock,
  FaServer,
  FaRocket,
  FaUserGraduate,
  FaUserTie,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
 import img from '../images/redesigned-hero-image.png';

const impactStats = [
  { label: 'Students Placed', value: '2,000+', color: 'teal.400' },
  { label: 'Highest Salary', value: '32 LPA', color: 'blue.400' },
  { label: 'Partner Companies', value: '50+', color: 'purple.400' },
  { label: 'Avg. Salary', value: '8.5 LPA', color: 'orange.400' },
];

const courses = [
  {
    icon: FaUserGraduate,
    title: 'Full Stack Development',
    desc: 'Master MERN/Java stacks, build real-world projects, and get placement support.',
    duration: '8 Months',
    color: 'teal.400',
  },
  {
    icon: FaUserTie,
    title: 'Data Analytics',
    desc: 'Learn data wrangling, visualization, and analytics with hands-on mentorship.',
    duration: '6 Months',
    color: 'blue.400',
  },
  {
    icon: FaRocket,
    title: 'Data Science & AI',
    desc: 'Dive into ML, AI, and data science with industry projects and expert guidance.',
    duration: '10 Months',
    color: 'purple.400',
  },
];

const testimonials = [
  {
    name: 'Sandeep Singh',
    before: 'Chemical Engineer',
    after: 'Software Engineer',
    company: 'Innovaccer',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Kabita Mondal',
    before: 'M.Sc in CS',
    after: 'Application Developer',
    company: 'Thoughtworks',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Akash Ingoley',
    before: 'Gap year',
    after: 'Software Developer',
    company: 'Pay Glocal',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
];

const features = [
  {
    icon: FaUserShield,
    title: 'Role-Specific Dashboards',
    desc: 'Distinct dashboards for Admins, Instructors, and Students, each with tailored features and controls.',
  },
  {
    icon: FaLock,
    title: 'Secure Authentication',
    desc: 'JWT-based authentication and robust role-based access control for all user operations.',
  },
  {
    icon: FaServer,
    title: 'RESTful APIs & MongoDB',
    desc: 'Well-structured REST APIs and efficient MongoDB/Mongoose data modeling for courses, lessons, users, and more.',
  },
  {
    icon: FaRocket,
    title: 'Deployed & Scalable',
    desc: 'Backend on Render, frontend on Vercel, with CORS and error handling for smooth, scalable deployment.',
  },
];

const gradient = 'linear(to-r, teal.400, blue.400)';

const LandingPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>  
      {/* Navbar */}
      <Flex as="nav" align="center" justify="space-between" px={{ base: 4, md: 16 }} py={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="sm" position="sticky" top={0} zIndex={10}>
        <HStack spacing={2}>
          <Heading size={isMobile ? 'md' : 'lg'} bgGradient={gradient} bgClip="text" fontWeight="extrabold" letterSpacing="tight">SkillGate</Heading>
        </HStack>
        <Spacer />
        <HStack spacing={4}>
          <Button colorScheme="teal" variant="ghost" onClick={() => window.location.href = '/login'}>Login</Button>
          <Button colorScheme="teal" onClick={() => window.location.href = '/register'}>Register</Button>
        </HStack>
      </Flex>

      {/* Hero Section */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        px={{ base: 4, md: 16 }}
        py={{ base: 10, md: 24 }}
        gap={10}
        bgGradient="linear(to-br, teal.50, blue.50, white)"
        borderBottomRadius={{ base: '2xl', md: '3xl' }}
        boxShadow="md"
      >
        <Stack spacing={6} flex={1} zIndex={2}>
          <Heading
            as={motion.h1}
            size="2xl"
            bgGradient={gradient}
            bgClip="text"
            fontWeight="extrabold"
            lineHeight={1.1}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Launch Your Tech Career with SkillGate
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color={useColorModeValue('gray.700', 'gray.200')}>
            Learn. Build. Get Hired. The fastest way from classroom to career.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Button colorScheme="teal" size="lg" onClick={() => window.location.href = '/login'}>
              Get Started
            </Button>
            <Button variant="outline" colorScheme="teal" size="lg" onClick={() => window.location.href = '/register'}>
              Register
            </Button>
          </Stack>
        </Stack>
        <MotionBox
          flex={1}
          display={{ base: 'none', md: 'block' }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={img}
            alt="SkillGate Hero"
            w="100%"
            maxH="340px"
            objectFit="contain"
            background="none"
          />
        </MotionBox>
      </Flex>



      {/* Courses */}
      <Box px={{ base: 4, md: 16 }} py={10}>
        <Heading as="h2" size="xl" mb={8} textAlign="center" fontWeight="bold">Courses</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {courses.map((course) => (
            <MotionBox
              key={course.title}
              p={7}
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="2xl"
              boxShadow="lg"
              whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              transition={{ duration: 0.3 }}
              textAlign="center"
            >
              <Box mb={4} fontSize="4xl" color={course.color}>
                <Icon as={course.icon} />
              </Box>
              <Text fontWeight="bold" fontSize="xl" mb={2}>{course.title}</Text>
              <Text color={useColorModeValue('gray.600', 'gray.300')} mb={2}>{course.desc}</Text>
              <Text fontSize="sm" color="gray.500">Duration: {course.duration}</Text>
              <Button mt={4} colorScheme="teal" variant="outline" size="sm" onClick={() => window.location.href = '/register'}>
                View Program
              </Button>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>

      {/* Features */}
      <Box px={{ base: 4, md: 16 }} py={12}>
        <Heading as="h2" size="xl" mb={8} textAlign="center" fontWeight="bold">Why SkillGate?</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {features.map((f) => (
            <MotionBox
              key={f.title}
              p={6}
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="xl"
              boxShadow="md"
              whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              transition={{ duration: 0.3 }}
              textAlign="center"
            >
              <Box mb={4} fontSize="3xl" color="teal.400">
                <Icon as={f.icon} />
              </Box>
              <Text fontWeight="bold" fontSize="lg" mb={2}>{f.title}</Text>
              <Text color={useColorModeValue('gray.600', 'gray.300')}>{f.desc}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>

      {/* Testimonials */}
      <Box px={{ base: 4, md: 16 }} py={10}>
        <Heading as="h3" size="lg" mb={6} textAlign="center" fontWeight="bold">
          Those Who Acted And Transformed
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {testimonials.map((t) => (
            <MotionBox
              key={t.name}
              p={7}
              bg={useColorModeValue('white', 'gray.800')}
              borderRadius="2xl"
              boxShadow="lg"
              whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              transition={{ duration: 0.3 }}
              textAlign="center"
            >
              <Avatar size="xl" name={t.name} src={t.img} mb={4} />
              <Text fontWeight="bold" fontSize="lg">{t.name}</Text>
              <Text color="gray.500" fontSize="sm" mb={2}>{t.company}</Text>
              <Divider my={2} />
              <Text fontSize="sm" color="gray.600"><b>Before:</b> {t.before}</Text>
              <Text fontSize="sm" color="teal.500"><b>After:</b> {t.after}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>

      {/* Tech Stack & Highlights */}
      <Box px={{ base: 4, md: 16 }} py={10}>
        <Heading as="h3" size="lg" mb={6} textAlign="center" fontWeight="bold">
          Tech Stack & Highlights
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} alignItems="stretch">
          {/* Frontend Card */}
          <MotionBox
            p={8}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="2xl"
            boxShadow="lg"
            whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
            textAlign="left"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={3}
          >
            <HStack mb={2} spacing={3}>
              <Icon as={FaUserGraduate} fontSize="2xl" color="teal.400" />
              <Text fontWeight="bold" fontSize="xl">Frontend</Text>
            </HStack>
            <Text color={useColorModeValue('gray.600', 'gray.300')} fontWeight="bold">React.js, Vite, Chakra UI, Framer Motion, React Icons, Axios</Text>
            <Divider />
            <Text fontSize="sm" color="gray.500">
              • Modern SPA with React functional components<br/>
              • State management with hooks<br/>
              • Responsive UI with Chakra UI<br/>
              • Animations with Framer Motion<br/>
              • API integration via Axios<br/>
              • Form validation, protected routes, and role-based navigation
            </Text>
          </MotionBox>
          {/* Backend Card */}
          <MotionBox
            p={8}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="2xl"
            boxShadow="lg"
            whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
            textAlign="left"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={3}
          >
            <HStack mb={2} spacing={3}>
              <Icon as={FaServer} fontSize="2xl" color="blue.400" />
              <Text fontWeight="bold" fontSize="xl">Backend</Text>
            </HStack>
            <Text color={useColorModeValue('gray.600', 'gray.300')} fontWeight="bold">Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, CORS</Text>
            <Divider />
            <Text fontSize="sm" color="gray.500">
              • RESTful API architecture<br/>
              • Modular controllers, routes, and middleware<br/>
              • Authentication with JWT & Bcrypt<br/>
              • Role-based access control<br/>
              • Centralized error handling<br/>
              • MongoDB schema design with Mongoose<br/>
              • CORS and security best practices
            </Text>
          </MotionBox>
          {/* DevOps & Deployment Card */}
          <MotionBox
            p={8}
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="2xl"
            boxShadow="lg"
            whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
            textAlign="left"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={3}
          >
            <HStack mb={2} spacing={3}>
              <Icon as={FaLock} fontSize="2xl" color="purple.400" />
              <Text fontWeight="bold" fontSize="xl">Deployment</Text>
            </HStack>
            <Text color={useColorModeValue('gray.600', 'gray.300')} fontWeight="bold">Render, Vercel, GitHub, Postman, Environment Variables</Text>
            <Divider />
            <Text fontSize="sm" color="gray.500">
              • Backend deployed on Render<br/>
              • Frontend deployed on Vercel<br/>
              • Version control with Git & GitHub<br/>
              • API testing with Postman<br/>
              • Secure config with .env files<br/>
              • Automated build & deployment pipelines
            </Text>
          </MotionBox>
        </SimpleGrid>
      </Box>

      {/* Footer */}
      <Box as="footer" py={8} textAlign="center" bg={useColorModeValue('gray.100', 'gray.800')}>
        <Text fontSize="lg" fontWeight="medium">
          Ready to experience SkillGate?{' '}
          <Button colorScheme="teal" size="md" ml={2} onClick={() => window.location.href = '/login'}>
            Login
          </Button>
        </Text>
        <Text mt={2} color="gray.500" fontSize="sm">
          &copy; {new Date().getFullYear()} SkillGate. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default LandingPage;
