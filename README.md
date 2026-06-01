# Interview Prep Analysis

Interview Prep Analysis is a full-stack MERN application designed to help users prepare for technical and HR interviews. The platform allows users to browse interview questions, submit answers, receive automated feedback based on answer analysis, and track their preparation progress through personalized analytics. 
The application includes secure JWT-based authentication, question and answer management, search functionality, pagination, and performance tracking features. It provides a structured environment for practicing interview questions and monitoring improvement over time.
---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User Profile

### Question Management

* Create Interview Questions
* View All Questions
* Search Questions
* Pagination Support
* View Question Details

### Answer Management

* Submit Answers
* View Answers for a Question
* View Personal Answer History
* Delete Own Answers

### Analytics Dashboard

* Total Answers Submitted
* Average Answer Length
* Total Questions Attempted
* Performance Tracking

### Answer Analysis

* Automatic Word Count
* Answer Scoring
* Personalized Feedback Generation

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* JWT Authentication
* Mongoose

### Database

* MongoDB Atlas

---

## Project Structure

```bash
Interview_Prep_Analysis/
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── index.js
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── layouts/
│   └── public/
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/interview-prep-analysis.git
cd interview-prep-analysis
```

---

## Backend Setup

### Navigate to Backend

```bash
cd Backend
```

### Install Dependencies

```bash
npm install
```

### Create .env File

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

### Start Backend

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

## Frontend Setup

### Navigate to Frontend

```bash
cd Frontend
```

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/auth/register | Register User |
| POST   | /api/v1/auth/login    | Login User    |
| GET    | /api/v1/auth/profile  | Get Profile   |

---

### Questions

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | /api/v1/questions     | Create Question    |
| GET    | /api/v1/questions     | Get All Questions  |
| GET    | /api/v1/questions/:id | Get Question By ID |
| DELETE | /api/v1/questions/:id | Delete Question    |

---

### Answers

| Method | Endpoint                             | Description      |
| ------ | ------------------------------------ | ---------------- |
| POST   | /api/v1/answers                      | Submit Answer    |
| GET    | /api/v1/answers/user                 | User Answers     |
| GET    | /api/v1/answers/question/:questionId | Question Answers |
| GET    | /api/v1/answers/analytics            | User Analytics   |
| DELETE | /api/v1/answers/:id                  | Delete Answer    |

---

## Future Enhancements

* AI-Powered Answer Evaluation
* Resume Analysis
* Interview Recommendation System
* Mock Interview Generator
* Leaderboards
* Role-Based Question Sets
* LLM Integration
* Speech-to-Text Interview Practice

---

## Learning Outcomes

This project demonstrates:

* Full Stack MERN Development
* JWT Authentication
* REST API Design
* MongoDB Integration
* Pagination & Search
* State Management
* Protected Routes
* API Standardization
* Error Handling
* Responsive UI Design

---

## Author

**Sujal Budhiraja**

B.Tech Computer Science Engineering (Cyber Security)

Interested in Full Stack Development, AI, Machine Learning, and Cyber Security.

