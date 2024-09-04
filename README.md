# Todo API

Welcome to the Todo API! This project is a simple RESTful API built using Node.js, Express, MongoDB, Mongoose, bcrypt, and JWT for managing todos and user authentication.

## Features

- **User Management:** Register and authenticate users.
- **Todo Management:** Create, read, update, and delete todos.
- **JWT Authentication:** Secure endpoints with JSON Web Tokens (JWT).
- **Password Hashing:** Secure user passwords with bcrypt.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing user and todo data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken (JWT)**: Library for generating and verifying JSON Web Tokens.

## Installation

To run this project locally, follow these steps:

1. Clone the repository (https://github.com/GawerMayank/todoApi.git)
2. Navigate to the project directory `cd shoppingCart`
3. Install dependencies using `npm install`
4. Configure the database connection, edit config/db.js with your MongoDB connection string
5. Set environment variables: PORT, MONGODB_URI, TOKEN_KEY, TOKEN_KEY_EXPIRY
6. Start the application `npm start`
7. Open your browser and go to `http://localhost:3000` to view the application.

## Api Endpoints

### User Endpoints
- POST `http://localhost:3000/api/users/register`: Register a new user
- POST `http://localhost:3000/api/users/login`: Authenticate a user and get a JWT
- POST `http://localhost:3000/api/users/change-password`: Change the password for user
- GET `http://localhost:3000/api/users/current-user`: Get the details of current user
- DELETE `http://localhost:3000/api/users/delete`: Delete the user from DB

### Todo Endpoints (Requires Authentication)
- POST `http://localhost:3000/api/todos/create`: Create a new todo for authenticated user
- GET `http://localhost:3000/api/todos/all-todos`: Get all todos created by authenticated user
- PATCH `http://localhost:3000/api/todos/update/:id`: Update the todo by giving todo id
- DELETE `http://localhost:3000/api/todos/delete/:id`: Delete the todo by giving todo id

## Authentication

To access the protected todo endpoints, include the JWT token in the Authorization header of your requests: Authorization: Bearer <your_jwt_token>

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request detailing your changes.

## Contact

Name: Mayank Singh Gawer

Email: mayankgawer8698@gmail.com

Project link: https://github.com/GawerMayank/todoApi.git


