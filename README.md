# Auction Alley: 

![Auction_Alley_Banner](/src/assets/Project_Imgs/Auction_Alley_Banner.png)

# The Ultimate Collector Hub and Marketplace 🚀

## Introduction 📝

Auction Alley is a dedicated platform designed for enthusiasts and collectors of Anime, Comic Book, and Geek culture merchandise and memorabilia. Our goal is to provide a seamless and engaging user experience for collectors to display, purchase, sell, and manage their collections. With features like barcode scanning for item information, an online marketplace for price comparison, and stock tracking tools for item value history, Auction Alley stands out as the go-to hub for collectors.

## Core Technologies 💻

Auction Alley is built using a robust and modern tech stack to ensure a scalable, reliable, and high-performing application.

### Frontend

1. **React**: The core library for building our user interface, ensuring a dynamic and responsive user experience.
2. **Vite**: A lightning-fast build tool for modern web projects, providing an optimized development and production workflow.
   - **@vitejs/plugin-react**: Uses Babel for Fast Refresh.
   - **@vitejs/plugin-react-swc**: Uses SWC for Fast Refresh.
3. **MUI (Material-UI)**: For a sleek and professional user interface design, utilizing components from `@mui/material` and `@mui/icons-material`.
4. **Emotion**: Styled components with `@emotion/react` and `@emotion/styled` for powerful and flexible CSS styling.
5. **Axios**: For efficient and simple HTTP requests.
6. **Quagga** and **Barcode Detector Polyfill**: For barcode scanning capabilities, enhancing the ease of adding items to collections.
7. **GSAP**: For advanced animations and user interface effects.
8. **React Router**: Ensuring smooth navigation across different parts of the application.
9. **TailwindCSS**: Utility-first CSS framework for rapid UI development.
10. **React Material UI Carousel**: For interactive and engaging carousels.

### Backend

1. **Node.js** and **Express**: The backbone of our server, providing a robust and scalable backend infrastructure.
2. **Prisma**: An ORM for seamless database management with PostgreSQL.
3. **PostgreSQL**: Our choice of database for reliable and scalable data storage.
4. **Firebase**: For authentication and real-time database functionalities.
5. **CORS**: Enabling secure cross-origin requests.
6. **Dotenv**: For secure environment variable management.
7. **Jest** and **Supertest**: For comprehensive testing and ensuring code reliability.

## Features 😎

### MVP (Minimum Viable Product)
- User authentication via Firebase (email/password and Google sign-in)
- Display and manage collections using barcode scanning
- Online marketplace for price comparison
- Stock tracking tool for item value history
- Detailed item information display

### Stretch Goals
- Chat features for community interaction
- Integrated product shipping options
- Event creation and management for collector meetups and conventions

## Getting Started 🚀

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/AuctionAlley.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Set up environment variables
    ```sh
    cp .env.example .env
    # Add your environment variables to the .env file
    ```
4. Run the development server
    ```sh
    npm run dev
    ```

## Scripts 📜

### Frontend
- `dev`: Start the development server using Vite.
- `build`: Build the application for production.
- `lint`: Run ESLint to check for code issues.
- `preview`: Preview the production build.

### Backend
- `test`: Initialize the test database and run tests using Jest.
- `test:coverage`: Run tests and generate a coverage report.
- `start`: Start the server using Nodemon.

## Resources 📚

### Icons & Fonts
- [Boxicons](https://boxicons.com/)
- [Google Fonts](https://fonts.google.com/)

### APIs & Libraries
- [Firebase](https://firebase.google.com/)
- [Vite](https://vitejs.dev/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [MUI (Material-UI)](https://mui.com/)

## License 📄

Distributed under the ISC License. See `LICENSE` for more information.
