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

## Step 4: Persistent Storage (Critical for Database) 💾
**Important:** If you use the Free Tier, your database is *ephemeral* (it resets when the server restarts). To keep your data, you need to add a **Disk**.

1.  Scroll down to **Disks** (Advanced/paid feature).
2.  Click **Add Disk**.
3.  **Name**: `sqlite-data`
4.  **Mount Path**: `/opt/render/project/src/data` (We need to update the code to look here if you do this).
    *   *Alternative for Free Tier*: Use the app as-is. It will work, but data might be lost on redeploys.

## Step 5: Deploy
Click **Create Web Service**. Render will clone your repo, install dependencies, and start the server.

---

### Note on Database Path
By default, the app writes `todos.db` to the root folder.
-   **Free Tier**: This works fine but isn't persistent.
-   **Paid with Disk**: You'll need to tell the app to save the DB in the mounted disk path. Let me know if you want to upgrade to a paid disk, and I can adjust the code to support that path!
