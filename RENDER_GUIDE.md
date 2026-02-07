# How to Deploy to Render 🚀

Render is a great choice for this app because it supports persistent storage (disks), meaning your database won't disappear.

## Step 1: Push Latest Changes
Ensure all your local changes are on GitHub (I will do this for you next).

## Step 2: Create a Web Service on Render
1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub account and select your repository: `To-Do-List`.

## Step 3: Configure the Service
fill in the details as follows:

-   **Name**: `todo-list-app` (or any name you like)
-   **Region**: Closest to you (e.g., Singapore, Frankfurt, Oregon)
-   **Branch**: `main`
-   **Root Directory**: Leave blank (default)
-   **Runtime**: `Node`
-   **Build Command**: `npm install`
-   **Start Command**: `npm start`

## Step 4: Configure Database (PostgreSQL) �
This app now uses PostgreSQL.

1.  **Create a PostgreSQL Database on Render**:
    *   Go to **New +** -> **PostgreSQL**.
    *   give it a name (e.g., `todo-db`).
    *   **Region**: Same as your web service.
    *   Click **Create Database**.

2.  **Connect Web Service to Database**:
    *   Once created, copy the **Internal Database URL** from the database settings.
    *   Go to your `todo-list-app` **Web Service** -> **Environment**.
    *   Add a new Environment Variable:
        *   **Key**: `DATABASE_URL`
        *   **Value**: Paste the Internal Database URL.

## Step 5: Deploy
Click **Create Web Service** (or if already created, go to **Manual Deploy** -> **Deploy latest commit**).

Render will now use your managed PostgreSQL database. Your data is safe and persistent!
