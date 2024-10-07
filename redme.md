# Rent O Car Rental Reservation Client

This repository contains the code for the Rent O car rental reservation client application.

## Features

* **User Authentication:** Securely register and log in to access car rental services.
* **Car Search and Booking:** Browse a wide selection of vehicles, filter by criteria, and book your desired car.
* **Rental Management:** Manage your bookings, view rental details, and track your rental history.
* **Customer Support:** Contact our support team for assistance with any queries or issues.
* **Responsive Design:** The application is optimized for various screen sizes and devices.

## Technologies Used

* **React:** JavaScript library for building user interfaces.
* **TypeScript:** Superset of JavaScript that adds static typing for improved code quality.
* **Vite:** Fast development server and build tool.
* **Tailwind CSS:** Utility-first CSS framework for rapid styling.
* **Ant Design:** React UI library for building components.
* **Redux:** State management library for managing application data.
* **Redux Persist:** Persist Redux store data in local storage.
* **React Router DOM:** Routing library for navigating between different pages.
* **JSON Web Token (JWT):** Used for authentication and authorization.
* **Zod:** Schema validation library for data validation.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ferdousalam007/car-rental-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd car-rental-reservation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Setting up Environment Variables

1. **Create an `.env` file:** Create a file named `.env` at the root of your project.
2. **Add environment variables:** Inside the `.env` file, add the following variables:
   ```
   REACT_APP_API_URL=your-api-url
   REACT_APP_AUTH_URL=your-auth-url
   ```
   Replace `your-api-url` and `your-auth-url` with the actual URLs of your API and authentication services.
3. **Use environment variables:** You can access these variables in your code using `VITE_BACKEND_URL`

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application in your browser at `http://localhost:5173/`.

## Building for Production

1. Build the application:
   ```bash
   npm run build
   ```
2. The production build will be generated in the `dist` directory.

## Live Link

[https://car-rental-client-pink.vercel.app](https://car-rental-client-pink.vercel.app)

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and concise commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.