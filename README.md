Welcome to Consorcify

Consorcify is a comprehensive solution to manage your expenses as a user and your buildings as an administrator. It's designed to simplify your operations and provide seamless management capabilities.

Getting Started
Follow these instructions to set up the project locally. Note that the backend and frontend are separate applications within the same repository, so they have distinct configurations.

Prerequisites
Ensure you have the following installed on your machine:

Backend:

Node.js (v14 or above)
npm (v6 or above)
PostgreSQL
Frontend:

Node.js (v14 or above)
npm (v6 or above)
Cloning the Repository
Clone the repository:

bash
Copiar código
git clone https://github.com/yourusername/consorcify.git
cd consorcify
Checkout to the develop branch:

bash
Copiar código
git checkout develop
Installation
Backend
Navigate to the backend directory:

bash
Copiar código
cd back
Install the dependencies:

bash
Copiar código
npm install
Set up the environment variables:

Create a .env file in the back directory and add your configuration. Here's an example:

plaintext
Copiar código
DATABASE_URL=postgres://username:password@localhost:5432/consorcify
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PASSWORD=your_email_password
Run the database migrations:

bash
Copiar código
npm run typeorm migration:run
Frontend
Navigate to the frontend directory:

bash
Copiar código
cd front
Install the dependencies:

bash
Copiar código
npm install
Set up the environment variables:

Create a .env file in the front directory and add your configuration. Here's an example:

plaintext
Copiar código
NEXT_PUBLIC_API_URL=your_api_url
Running the Application
Using Workspaces
For ease of development, you can start both applications simultaneously using the workspace configuration in the develop branch.

From the root directory of the repository:

bash
Copiar código
npm run render
Running Individually
If you prefer to run the applications separately, follow these steps:

Start the backend server:

Open a terminal and navigate to the back directory:

bash
Copiar código
cd back
npm run start
Start the frontend development server:

Open another terminal and navigate to the front directory:

bash
Copiar código
cd front
npm run dev
Tools and Libraries
Consorcify utilizes various tools and libraries to enhance functionality:

Backend:

NestJS
TypeORM
PostgreSQL
JWT
Bcrypt
NodeMailer
Cloudinary
Cron Jobs
Frontend:

Next.js
React
Branching Strategy
Please note that the main branch is reserved for deployment. For development purposes, always use the develop branch. Any new features or bug fixes should be branched off from develop and merged back into develop upon completion.

Contact Us
If you have any questions or need assistance, feel free to reach out to us at consorcify@gmail.com.
