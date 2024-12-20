# HireHub

## Technology Stack
- **React**: Version 18
- **Next.js**: Version 14
- **ShadCN/UI**: Latest version
- **Drizzle ORM**: Latest version (for database interactions)
- **PostgreSQL**: Version compatible with Drizzle ORM
- **UploadThing**: Latest version (for file uploads)

---

## Installation Instructions

### 1. Server Installation
1. **Ensure Prerequisites are Installed**:
    - Node.js (version 18 or higher)
    - PostgreSQL (ensure the server is running)
    - Git (for cloning the repository)

2. **Clone the Repository**:
    ```bash
    git clone https://github.com/carefreebee/Hire-Hub.git
    cd <project-folder>
    ```

3. **Install Server Dependencies**:
    ```bash
    npm install
    ```

4. **Configure Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add the following variables (replace placeholders with actual values):
      ```env
      GOOGLE_REDIRECT_URI=<your-google-redirect-uri>
      MICROSOFT_REDIRECT_URI=<your-microsoft-redirect-uri>
      UPLOADTHING_SECRET=<your-uploadthing-secret>
      MICROSOFT_CLIENT_SECRET=<your-microsoft-client-secret>
      MICROSOFT_CLIENT_ID=<your-microsoft-client-id>
      MICROSOFT_TENANT_ID=<your-microsoft-tenant-id>
      GOOGLE_CLIENT_SECRET=<your-google-client-secret>
      GOOGLE_CLIENT_ID=<your-google-client-id>
      DATABASE_URL=<your-database-url>
      ```

5. **Run Database Migrations**:
    ```bash
    npm run db:migrate
    ```
6. **Access Drizzle Studio (Database Management)**:
	To view and manage your database, run:
	```bash
	npm run db:studio
	```
7. **Start the Development Server**:
    ```bash
    npm run dev
    ```

### 2. Client Installation
1. **Install Client Dependencies**:
    - No additional setup is required; the client is bundled with the Next.js project.

2. **Access the Client**:
    - Once the development server is running, navigate to `http://localhost:3000` in your browser.

---

## First-Time Setup

### 1. Admin and User Roles
- **Login/Register**:
  - First-time users can navigate to `http://localhost:3000/login` to register or log in using their Google or Microsoft accounts.
  - Admins will verify user accounts in the database before granting additional access.

- **Landing Page**:
  - Unregistered users or those browsing jobs can visit the landing page at `http://localhost:3000` to explore and apply for job postings.

### 2. Recruitment Process
The recruitment and selection process is as follows.
![Screenshot 2024-12-20 211400](https://github.com/user-attachments/assets/58f0db37-8a66-48b8-ad07-86af004cb57f)

---

## User Instructions

### General Usage
1. **Login/Register**:
    - Access the login page at `http://localhost:3000/login`.

2. **Browsing Jobs and Applying for jobs**:
    - Unregistered users can explore and apply for job postings on the landing page (`http://localhost:3000`).

