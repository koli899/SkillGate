# SkillGate 🎓🚀

SkillGate is a secure and scalable backend system built with **Node.js**, **Express**, and **MongoDB**, featuring robust authentication, role-based access control, and rate limiting. It's designed for learning platforms or services requiring user management, login security, and flexible access policies.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: 
  - Rate Limiting
  - Role-based Access Control (Admin, User)
  - Password Hashing (bcrypt)
- **Others**: dotenv for environment configs

---

## 🚀 Features

- ✅ User Signup & Login
- ✅ JWT Authentication
- ✅ Role-based Access Control (Admin/User)
- ✅ Rate Limiting (to prevent brute force attacks)
- ✅ Middleware for error handling & protected routes

---

## 📁 Project Structure

SkillGate/
│
├── controllers/ # All route controller logic
├── middlewares/ # Custom middleware (auth, rateLimit, etc.)
├── models/ # Mongoose models (User, etc.)
├── routes/ # Route definitions
├── utils/ # Utility functions (e.g., token handling)
├── .env # Environment variables
├── .gitignore
├── package.json
├── server.js # Entry point



---

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/koli899/SkillGate.git
   cd SkillGate
2.**Install dependencies**
npm install

3.**Setup environment variables**

Create a .env file in the root and add:
PORT=8000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
Start the server

4.**For development:**
npm run dev

📮 API Endpoints Overview
| Method | Endpoint         | Description             | Access |
| ------ | ---------------- | ----------------------- | ------ |
| POST   | `/user/register` | Register a new user     | Public |
| GET    | `/user/login`    | Login and receive token | Public |

| Method | Endpoint                   | Description                     | Access                  |
| ------ | -------------------------- | ------------------------------- | ----------------------- |
| POST   | `/course/create`           | Create a new course             | Admin, Instructor       |
| GET    | `/course/all`              | Get all available courses       | Public                  |
| GET    | `/course/enrollCourse/:id` | Enroll in a specific course     | User                    |
| GET    | `/course/yourCourses`      | Get courses related to the user | Admin, Instructor, User |
| PATCH  | `/course/updateCourse/:id` | Update an existing course       | Admin, Instructor       |
| DELETE | `/course/deleteCourse/:id` | Delete a course                 | Admin, Instructor       |

**🔒 Security**
JWT: Secure token-based authentication
Role Checks: Restrict access to endpoints
Rate Limiting: Prevents brute-force attacks
Validation: Basic input validation and error handling

**🧑‍💻 Author**
Tushar Koli
🔗 GitHub Profile

**📄 License**
This project is licensed under the MIT License.

