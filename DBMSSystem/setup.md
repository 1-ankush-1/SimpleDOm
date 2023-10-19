# Setup Instructions

Follow these steps to set up and run the project:

1. **Fork and Clone the Repository**: Start by forking the repository to your GitHub account. Then, clone the forked repository to your local machine using `git clone`.

2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install all the necessary dependencies.

3. **Create .env File**: Create a `.env` file in the root directory of the project. This file will store all your environment variables. Add the following variables to the `.env` file:

   ```plaintext
   PORT = 3000
   DBHOST=localhost
   DBUSER=<Enter your database username here>
   DB=<Enter your database name here>
   DBPASSWORD=<Enter your database password here>
   ```

   Replace `<Enter your database username here>`, `<Enter your database name here>`, and `<Enter your database password here>` with your actual database username, name, and password.

4. **Run the Project**: You can run the project in two ways:
   - **Development Mode**: Use `npm run dev` to start the server in development mode.
   - **Production Mode**: Use `npm start` to start the server in production mode.

That's it! You've successfully set up and run the project. Enjoy coding!
