# Mall-Sage: Innovating The Shopping Mall Experience

**Mall-Sage** is a web application designed to enhance the shopping mall experience by providing features like **luggage management, resting location tracking, car park availability and reservations, and promotional blogs for shop owners**.

## Features

- **Luggage Management**: Users can drop off lugagges at the shops and retrieve their luggage seamlessly when they exist.
- **Resting Locations Tracking & Reservation**: Helps visitors find and track available resting spots inside the mall and make reservations.
- **Car Park Availability & Reservation**: Users can check real-time car park availability and make reservations.
- **Promotional Blogs**: Shop owners can create and manage promotional blogs to attract customers.
- **User Management**: Customers and mall staff can register and log in based on their respective roles.

## User Roles

### Customers:
- Can sign up and log in.
- Can check luggage management services.
- Can track resting locations.
- Can check and reserve parking slots.

### Admin Panel:
Admins have different levels of access based on their roles:

- **Admin**: Full access to manage users, shops, and mall operations.
- **Security Officera**: Monitors car parking slots, track resting location slots and assists customers.
- **Shop Owners**: Can create promotional blogs and manage shop information.
- **Baggage Employee**: Handles luggage management requests.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js (Express.js)
- **Database**: MongoDB
- **Authentication**: JWT

## Installation Guide

### Prerequisites:
- Node.js installed
- MongoDB setup
- Git installed

### Steps to Run Locally:

#### Clone the repository:
```sh
git clone https://github.com/your-username/mall-sage.git
cd mall-sage
```

#### Backend Setup:
```sh
cd backend
npm install
npm start
```

#### Frontend Setup:
```sh
cd frontend
npm install
npm start
```

### Environment Variables
Create a `.env` file in the backend and frontend directories with the required environment variables:

#### Backend `.env` Example:
```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```


