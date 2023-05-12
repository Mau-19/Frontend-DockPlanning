# Dockplanning Front-end

## Getting the application Running

This section will explain how to run the application on your end.

### Pre requisites

Before running the application make sure you have the following things:

- The LeeuweEnCo backend. (with the prerequisite dock-planner routes)
- The database, pre-populated with docks and warehouses. If these are not present, the application will not function.
- A local .env file. You need to add this to the root of your project, on the same level as the readme, tsconfig, vite.config etc.
  - The way your .env file should look like is documented in the .env.example file. You need to add the url of the backend to the NODE_API_HOST key. Localhost is used in the example.
- Make sure to "npm install" on the root level of the application so that dependencies are installed.

### Running the application

To run the application, open your terminal and make sure you're on this level: "Front-end-dock-planning" and make sure you've ran "npm install" for the dependencies. In the opened terminal, run the following command: "npm run dev" (without quotation marks). This command will start the vite application, after a couple seconds your terminal will display a message that says the server is running on port 5173. Go to http://localhost:5173/ in your browser to get to the application. You will be greeted by the login screen.
