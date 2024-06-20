## Welcome to Consorcify 🎉

Consorcify is a comprehensive solution designed to simplify expense management for users and building administration for administrators. It provides seamless management capabilities to streamline your operations.

![Consorcify Logo](https://res.cloudinary.com/consorcify/image/upload/v1718844349/descarga_a0acun.png)

## Getting Started 🚀

This guide will walk you through setting up the project locally. The backend and frontend are separate applications within the same repository, so they have distinct configurations.

### Prerequisites 🛠️

Before we begin, ensure you have the following installed on your machine:

* Node.js (v14 or above) 🌐
* npm (v6 or above) 📦
* PostgreSQL 🐘
### Cloning the Repository 📥

1. Clone the repository using the following command:

```bash
git clone https://github.com/yourusername/consorcify.git
cd consorcify
```

2. Checkout to the develop branch:

```bash
git checkout develop
```

### Installation ⚙️

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

   Create a file named `.env.development` in the back/src directory and add your configuration details. Here's an example:

```
DB_NAME=consorcify
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=<your_database_password>
JWT_SECRET=your_jwt_secret
CADMIN_PASS=<consorcify_admin_password>
API_BASE_URL=<your_api_base_url>
CLIENT_BASE_URL=<your_client_base_url>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_PUBLISH_KEY=<your_stripe_publishable_key>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>
MAIL_HOST=<your_mail_host>
MAIL_USER=<your_mail_username>
MAIL_PASSWORD=<your_mail_password>
MAIL_FROM=<your_mail_from_address>
MAIL_REDIRECT_URL=<your_mail_redirect_url>

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

   Create a file named `.env.local` in the front directory and add your configuration details. Here's an example:

```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_MAPS_API_KEY=<your_next_public_maps_api_key>
```

### Running the Application 🏃‍♂️

There are two options for running the application: using workspaces or running them individually.

#### Using Workspaces (Recommended for Development)

For a more convenient development experience, you can use the workspace configuration in the develop branch to start both applications simultaneously.

1. Navigate to the root directory of the repository:

```bash
cd consorcify
```

2. Run the following command:

```bash
npm run dev
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

## Tools and Libraries 🛠️

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


## Collaborators 🤝
Here are the GitHub profiles of the development Consorcify Team:

[![Samuel Rivera](https://github.com/samuel20468.png?size=100)](https://github.com/samuel20468)&nbsp;
[![Juan Molina](https://github.com/JuaniMolina.png?size=100)](https://github.com/JuaniMolina)&nbsp;
[![Marcos Lombardo](https://github.com/MarcosLombardo.png?size=100)](https://github.com/MarcosLombardo)&nbsp;
[![Marcos Anselmo Portillo](https://github.com/MarcosAnselmoPortillo.png?size=100)](https://github.com/MarcosAnselmoPortillo)&nbsp;
[![Leonel Nusdeo](https://github.com/LeonelNusdeo.png?size=100)](https://github.com/LeonelNusdeo)&nbsp;
[![Adriana Cuellar](https://github.com/cuellaradriana.png?size=100)](https://github.com/cuellaradriana)
[![Angel Vázquez](https://github.com/iLxgh.png?size=100)](https://github.com/iLxgh)


## Branching Strategy 🌿

The main branch (`main`) is strictly for deployment purposes. Always use the develop branch for development activities. Create new branches for features or bug fixes from `develop` and merge them back into `develop` upon completion.

## Contact Us 📧

If you have any questions or require assistance, feel free to contact us at consorcify@gmail.com.
We're here to help! 😊
