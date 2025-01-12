# Chat Application - Project Documentation

## Overview
The Chat Application is a full-stack project designed to facilitate real-time communication between users. The backend is built with Spring Boot, while the frontend is implemented using React.js. This documentation outlines the project's backend and frontend features, including how they work together to provide a seamless chat experience.

---

## Backend Architecture
The backend of this chat application is developed using Spring Boot and comprises the following key components:

### 1. **Controllers**
- **Purpose**: Handle HTTP requests and define endpoints for the chat application.
- **Endpoints**:
  - `POST /register`: Handles user registration.
  - `POST /login`: Authenticates users and issues JWT tokens.
  - `GET /chat/messages`: Retrieves chat messages.
  - `POST /chat/send`: Allows users to send messages.
  - `GET /logout`: Invalidates the user's session and token.

### 2. **Service Layer**
- **Purpose**: Contains business logic for the application.
- **Features**:
  - User management: Handles user registration, authentication, and logout.
  - Chat message processing: Manages sending, storing, and retrieving chat messages.
  - WebSocket communication: Facilitates real-time chat updates between users.

### 3. **Entities**
- **Purpose**: Represent the application's database tables.
- **Key Entities**:
  - `User`: Contains user details (e.g., username, password, email).
  - `Message`: Represents chat messages (e.g., sender, receiver, timestamp, content).

### 4. **WebSocket Configuration**
- **Purpose**: Enables real-time, bidirectional communication between clients.
- **Features**:
  - Configures WebSocket endpoints for live messaging.
  - Handles user subscriptions to chat topics.
  - Updates all active clients when new messages are sent.

### 5. **Security**
- **Purpose**: Secures the application using Spring Security and JWT.
- **Features**:
  - Implements authentication and authorization.
  - Protects endpoints to ensure only authenticated users have access.
  - Generates and validates JWT tokens for session management.
  - Logout endpoint invalidates tokens.

### 6. **Database**
- **Purpose**: Stores application data persistently.
- **Database Schema**:
  - User Table: Stores user credentials and metadata.
  - Message Table: Stores chat messages.
- **Database Options**:
  - Configured with an SQL database for development.
  - Hibernate.

### 7. **Swagger API Documentation**
- **Purpose**: Provides a user-friendly interface for testing APIs.
- **Features**:
  - Automatically generates API documentation for all endpoints.
  - Accessible via `/swagger-ui.html`.
  - http://localhost:8080/swagger-ui/index.html

### Backend Diagram
```plaintext
Client --> [Spring Security (JWT)] --> Controller --> Service --> Repository --> Database
                  ↳ WebSocket Configuration ↲
```

---

## Frontend Architecture
The frontend of the application is built using React.js and follows a modular component-based structure.

### Features
- **User Authentication**:
  - Login and register pages for user authentication.
  - JWT-based authentication for secure API access.
- **Real-Time Messaging**:
  - Sends and receives messages in real-time using WebSockets.
  - Displays message history and updates live with new messages.
- **Responsive Design**:
  - Ensures compatibility with mobile and desktop devices.
- **Logout Functionality**:
  - Allows users to securely log out of the application.

### Key Components
1. **`Header`**:
   - Displays the application logo and navigation links (e.g., Login, Register, Logout).
   - Fixed at the top for consistent navigation.

2. **`Login` & `Register`**:
   - Capture user credentials.
   - Communicate with backend endpoints for authentication and registration.

3. **`ChatRoom`**:
   - Main interface for sending and receiving messages.
   - Displays a list of messages and an input box for new messages.

4. **`Logout`**:
   - Clears user session and redirects to the login page.

### Frontend Diagram
```plaintext
Header
   |-- Logo
   |-- Navigation Links (Login, Register, Logout)

Container
   |-- Login/Register Forms
   |-- ChatRoom
       |-- Message List
       |-- Message Input Box
```

---

## How It Works

1. **User Flow**:
   - Users register or log in via the authentication system.
   - Upon login, a JWT token is issued and stored in the frontend.
   - Authenticated users access the chat interface.

2. **Real-Time Messaging**:
   - WebSocket establishes a connection between clients and the server.
   - Users send messages via the `ChatRoom` component, which updates the database.
   - All connected clients receive updates instantly.

3. **Logout**:
   - Users can log out via the `Logout` component.
   - The session token is invalidated, and the user is redirected to the login page.

---

## Project Highlights
- **Security**: JWT authentication ensures secure communication and Password Encoding converting to Hashed password.
- **Real-Time Functionality**: WebSocket implementation for live updates.
- **Responsive Design**: Frontend is optimized for mobile and desktop devices.
- **Documentation**: Swagger provides easy-to-use API testing.

How to Run the Project Locally
Running the Frontend Locally
Navigate to the chat-frontend/ directory:

bash
Copy code
cd chat-frontend
Install the required dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000. The React application should be up and running locally.

Running the Backend Locally
Navigate to the chatapp/ directory:

bash
Copy code
cd chatapp
Install the required dependencies (if any Maven dependencies need to be downloaded):

bash
Copy code
mvn clean install
Run the Spring Boot application:

bash
Copy code
mvn spring-boot:run
By default, the backend will run on http://localhost:8080. You can access the API endpoints locally.



