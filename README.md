# Amusement Finder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TypeScript template.

## Running the Project

### Step 1: Install Dependencies

In the project directory `amusement-finder`, run the following command to install all required packages and libraries:

```sh
npm install
```

### Step 2: Set Up the Backend

Ensure that the backend is running locally. The backend can be found [here](https://github.com/cobyknight/DatabaseAmusementParkProject). Follow the instructions in the backend repository to start the server. The backend should open a Swagger page if successfully started.

### Step 3: Configure Environment Variables

In the `.env` file in the root directory, change the value of `REACT_APP_API_BASE_URL` to the URL of the Swagger page. This connects the frontend to the backend.

Example `.env` file:

```env
REACT_APP_API_BASE_URL=http://localhost:5130
```

### Step 4: Start the Frontend

In the project directory, run the following command to start the app in development mode:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Additional Information

- This project uses [Redux](https://redux.js.org/) for state management.
- The project structure follows best practices for a scalable and maintainable codebase.
- For more information on how to use Create React App, refer to the [official documentation](https://create-react-app.dev/docs/getting-started/).
