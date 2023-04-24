# Shulutions

Shulutions is a full-stack web application built using Angular and NestJS. The purpose of this application is to provide a platform for users to share, discuss, and manage open-source projects efficiently.

This README.md file contains the necessary information for setting up and running the Shulutions application on your local machine.

## User Types and Features

Shulutions supports 4 types of users, each with specific features and capabilities:

### Non-user

- View project ideas and comments
- View information about the current open-source projects
- Join the sub-community of the open-source projects they are interested in
- Register for an account

### Registered user

- Login to their account
- Post new project ideas
- Vote for their favorite project ideas
- Comment on project ideas
- Update profile details

### Project Manager

- Update the details of the projects they are managing

### Admin

- View and update all projects on the system
- View and delete project ideas
- Manage the projects that are displayed on the website

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js v14.x.x or higher
- npm v6.x.x or higher
- Angular CLI v12.x.x or higher
- NestJS CLI v8.x.x or higher

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/shulutions.git
cd shulutions
```

2. Install the dependencies for both the frontend and backend:

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Configure the environment variables:

Create a `.env` file in the `/backend` directory and configure the necessary environment variables (e.g., database credentials, JWT secret, etc.).

4. Start the NestJS backend:

```bash
cd backend
npm run start:dev
```

The backend server should now be running on `http://localhost:3000`.

5. Start the Angular frontend:

```bash
cd ../frontend
ng serve
```

The frontend application should now be running on `http://localhost:4200`.

## Support

If you encounter any issues or have any questions about the project, please create an issue or contact the project maintainers.

Happy coding!
