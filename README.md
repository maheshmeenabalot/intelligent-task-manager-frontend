# Intelligent Task Manager - Frontend

The **Intelligent Task Manager** is designed to streamline task management and collaboration through a user-friendly interface. The frontend of this project is built with React, providing a dynamic and responsive experience for users.

## Features

1. **Task Management:**
   - Create, edit, delete, and search tasks.
   - Filter tasks by status and priority.
   - Add collaborators to tasks.

2. **Real-Time Updates:**
   - Utilizes Socket.io for real-time task updates.

3. **User Authentication:**
   - Secure authentication with JSON Web Tokens (JWT).

4. **Responsive Design:**
   - User-friendly interface for both desktop and mobile.

## Live Demo

Check out the live demo: [Intelligent Task Manager](https://intelligent-task-manager.netlify.app/)

You can register as a user and explore the site and all its features. The backend is live at: [Backend API](https://intelligent-task-manager-2.onrender.com)

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Steps

1. Clone the frontend repository:

    ```bash
    git clone https://github.com/maheshmeenabalot/intelligent-task-manager-frontend
    ```

2. Navigate into the project directory:

    ```bash
    cd intelligent-task-manager-frontend
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

    You can now view the application in your browser:

    - Local: http://localhost:3000
    - On Your Network: http://192.168.137.1:3000

5. To create a production build, use:

    ```bash
    npm run build
    ```

## Project Structure

The project structure follows best practices for a React application, ensuring maintainability and scalability.

intelligent-task-manager-frontend/
├── public/
│ ├── index.html
│ └── ...
├── src/
│ ├── assets/
│ ├── components/
│ ├── contexts/
│ ├── hooks/
│ ├── pages/
│ ├── services/
│ ├── utils/
│ ├── App.js
│ ├── index.js
│ └── ...
├── .env
├── .gitignore
├── package.json
└── README.md


- **assets/**: Contains static assets like images and icons.
- **components/**: Reusable components used throughout the application.
- **contexts/**: Context providers for global state management.
- **hooks/**: Custom hooks for business logic and data fetching.
- **pages/**: Page components representing different routes.
- **services/**: API service functions.
- **utils/**: Utility functions.

## Key Technologies

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **Socket.io-client**: Real-time bidirectional event-based communication.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Deployment

The frontend is deployed using Netlify, providing continuous deployment and easy management.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Additional Resources

For the full project, including the backend code and detailed documentation, visit the main repository: [Intelligent Task Manager](https://github.com/maheshmeenabalot/intelligent-task-manager)
