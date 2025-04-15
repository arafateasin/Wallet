## Project 1: Build a Web App using ECDSA

This project demonstrates the use of a client-server architecture to facilitate secure transfers between different addresses using **Elliptic Curve Digital Signatures (ECDSA)**. The goal is to ensure that only the owner of an address can authorize transactions by signing them with their private key.

---

## Setup Instructions

### Client

The client folder contains a [React app](https://reactjs.org/) using [Vite](https://vitejs.dev/). To get started:

1. Open a terminal in the `/client` folder.
2. Run `npm install` to install all dependencies.
3. Run `npm run dev` to start the application.
4. Visit the app at [http://localhost:5173/](http://localhost:5173/).

### Server

The server folder contains a Node.js server using [Express](https://expressjs.com/). To run the server:

1. Open a terminal in the `/server` folder.
2. Run `npm install` to install all dependencies.
3. Run `node index` to start the server.

**Hint**: Use `nodemon` for automatic server restarts on file changes:

```bash
npm i -g nodemon
nodemon index
```
