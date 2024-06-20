## Consorcify

Consorcify is a comprehensive solution designed to simplify expense management for users and building administration for administrators. It provides seamless management capabilities to streamline your operations.

## Getting Started

This guide will walk you through setting up the project locally. The backend and frontend are separate applications within the same repository, so they have distinct configurations.

### Prerequisites

Before we begin, ensure you have the following installed on your machine:

**Backend:**

* Node.js (v14 or above)
* npm (v6 or above)
* PostgreSQL

**Frontend:**

* Node.js (v14 or above)
* npm (v6 or above)

### Cloning the Repository

1. Clone the repository using the following command:

```bash
git clone https://github.com/yourusername/consorcify.git
cd consorcify
```

2. Checkout to the develop branch:

```bash
git checkout develop
```

### Installation

#### Backend

1. Navigate to the backend directory:

```bash
cd back
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:

   Create a file named `.env` in the back directory and add your configuration details. Here's an example:

```
DATABASE_URL=postgres://username:password@localhost:5432/consorcify
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PASSWORD=your_email_password
```

4. Run the database migrations:

```bash
npm run typeorm migration:run
```

#### Frontend

1. Navigate to the frontend directory:

```bash
cd front
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:

   Create a file named `.env` in the front directory and add your configuration details. Here's an example:

```
NEXT_PUBLIC_API_URL=your_api_url
```

### Running the Application

There are two options for running the application: using workspaces or running them individually.

#### Using Workspaces (Recommended for Development)

For a more convenient development experience, you can use the workspace configuration in the develop branch to start both applications simultaneously.

1. Navigate to the root directory of the repository:

```bash
cd consorcify
```

2. Run the following command:

```bash
npm run render
```

#### Running Individually

If you prefer to run the applications separately, follow these steps:

**Start the Backend Server:**

1. Open a terminal window and navigate to the back directory:

```bash
cd back
```

2. Start the server using the following command:

```bash
npm run start
```

**Start the Frontend Development Server:**

1. Open another terminal window and navigate to the front directory:

```bash
cd front
```

2. Start the development server using the following command:

```bash
npm run dev
```

## Tools and Libraries

Consorcify leverages various tools and libraries to enhance functionality:

**Backend:**

* NestJS
* TypeORM
* PostgreSQL
* JWT
* Bcrypt
* Nodemailer
* Cloudinary
* Cron Jobs

**Frontend:**

* Next.js
* React

## Branching Strategy

The main branch (`main`) is strictly for deployment purposes. Always use the develop branch for development activities. Create new branches for features or bug fixes from `develop` and merge them back into `develop` upon completion.

## Contact Us

If you have any questions or require assistance, feel free to contact us at [email address removed].
