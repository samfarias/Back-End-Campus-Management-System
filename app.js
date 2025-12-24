/*==================================================
/app.js

This is the top-level (main) file for the server application.
It is the first file to be called when starting the server application.
It initiates all required parts of server application such as Express, routes, database, etc.  
==================================================*/
/* SET UP DATABASE */
// Import database setup utilities
const createDB = require('./database/utils/createDB');  // Import function to create database
const seedDB = require('./database/utils/seedDB');  // Import function to seed database
// Import database instance for database connection (including database name, username, and password)
const db = require('./database');
// To allow frontend origin
const cors = require('cors');


/* MODEL SYNCHRONIZATION & DATABASE SEEDING */
// Set up sync and seed process
const syncDatabase = async () => {
  try {
    // Model Synchronization:
    // - Make a connection between the Node.js application (this server app) and the Postgres database application.
    // - Create new tables (according to the models) in the Postgres database application, dropping tables first if they already existed
    await db.sync({force: true});  // Drop table if already exists (force: true)
    console.log('------Synced to db--------')
    // Database Seeding
    await seedDB();  
    console.log('--------Successfully seeded db--------');
  } 
  // Error Handling
  catch (err) {
    console.error('syncDB error:', err);
  }  
}

/* SET UP EXPRESS APPLICATION */
// Import Express application
const express = require("express");
// Create an Express application called "app"
const app = express();

// Allow requests from GitHub Pages frontend, but also local
app.use(cors({
  origin: ['http://localhost:3000', 'https://sam-fulstack-crud-app-client-front-end-main.github.io', 'https://samfarias.github.io/Front-End-Campus-Management-System']
}));

/* SET UP ROUTES */
// Import sub-routes and associated router functions for students and campuses
const apiRouter = require('./routes/index');

/* CONFIGURE EXPRESS APPLICATION */
// Create a function to configure the Express application
const configureApp = async () => {
  // Middleware to handle request data and response
  app.use(express.json());  // Set up Express to parse JSON requests and generate JSON responses
  app.use(express.urlencoded({ extended: false }));  // Express to parse requests encoded in URL format and querystring

  // Set up the Express application's main top-level route and attach all sub-routes to it
  // Add main top-level URL path "/api" before sub-routes
  app.use("/api", apiRouter);  // Updated (complete) URL paths for API: "/api/students/", "/api/students/:id", "/api/campuses/", and "/api/campuses/:id"

  // SEED ROUTE FOR PRODUCTION (TEMPORARY)
const seedDB = require('./database/utils/seedDB');
app.get('/seed', async (req, res) => {
  try {
    await seedDB();
    res.send('Database seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
    res.status(500).send('Failed to seed database.');
  }
});

  // Handle routing error: Page Not Found
  // It is triggered when a request is made to an undefined route 
  app.use((req, res, next) => {
    const error = new Error("Not Found, Please Check URL!"); // Create a new error object with a message
    error.status = 404;  // Status code 404 Not Found - resource not found
    next(error);  // Call Error-Handling Middleware to handle the error
  });
  // Routing Error-Handling Middleware:
  // All Express routes' errors get passed to this when "next(error)" is called
  app.use((err, req, res, next) => {
    console.error(err); // Log the error to the console
    console.log(req.originalUrl); // Log the original URL that caused the error
    res.status(err.status || 500).send(err.message || "Internal server error.");  // Status code 500 Internal Server Error - server error
  });
};

/* SET UP BOOT FOR SERVER APPLICATION */
// Construct the boot process by incorporating all needed processes
/* ACTIVATE THE SERVER PORT */
const PORT =  process.env.PORT ||5001;  // Server application access point port number
const bootApp = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await createDB();        // Only run locally
    await syncDatabase();    // Only seed locally
  } else {
    await db.sync();         // Just sync tables in production
  }
  await configureApp();  // Start and configure Express application
  app.listen(PORT, console.log(`Server started on ${PORT}`)); // Set up express application to use port 5000 as the access point for the server application.
};

/* START THE SERVER BOOT */
// Finally, run the boot process to start server application
bootApp();



