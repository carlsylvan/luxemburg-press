# luxemburg-press

Luxemburg Press, an web shop built with the MERN stack (MongoDB, Express.js, React.js, Node.js), TypeScript, and PayPal integration. This application is structured into three main directories: `/frontend`, `/backend`, and `/server`.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- TypeScript
- MongoDB (Ensure it's running if you're using a local instance)

## Installation

Install the necessary dependencies in each part of the project. Execute these commands in your terminal:
/frontend
npm install

/backend
npm install

/server
npm install

```

## Running the Application

After the installation of dependencies, you can run each part of the application as follows:

Navigate to the `/backend/src` directory and run:
ts-node index.ts
In the `/server` directory, execute:
node server.js
From the `/frontend` directory, start the development server:
npm run dev

Ensure that all three parts are running simultaneously for the application to function correctly.

Payment through Paypal, click paypal button and log in, when the payment goes through the order is made on the orders DB.
Orders are found at /admin. Product addition and editing at /admin.

```
