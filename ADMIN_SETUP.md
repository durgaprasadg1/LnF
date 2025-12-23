# Admin Authentication Setup

## Overview

Admin and User authentication are now completely separated:

- **Users**: Firebase Auth (email/password or Google OAuth) → stored in `User` collection
- **Admins**: Custom auth (email/password + secret) → stored in `Admin` collection

## Environment Setup

Ensure `ADMIN_CREATION_SECRET` is set in your `.env` file:

```env
ADMIN_CREATION_SECRET=SuperSecretAdminKeyhehehe
```

## Creating an Admin

### Step 1: Navigate to Register Page

Go to `/register` in your browser.

### Step 2: Fill Admin Form

You'll see two forms on the register page:

1. **User Registration** (top) - for regular users
2. **Admin Registration** (bottom, red background) - for admins

Fill the admin form with:

- Admin name (min 2 characters)
- Admin email (valid email format)
- Admin password (min 8 characters)
- Admin creation secret (from `.env` file)

### Step 3: Submit

Click "Create Admin" button. On success, you'll be redirected to the login page.

## Logging In as Admin

### Step 1: Navigate to Login Page

Go to `/login` in your browser.

### Step 2: Use Admin Login Form

You'll see two login forms side by side:

1. **User Login** (left) - for regular users with Firebase
2. **Admin Login** (right, red background) - for admins

Fill the admin login form with:

- Admin email
- Admin password
- Admin secret (same secret used during creation)

### Step 3: Access Admin Dashboard

On successful login, you'll be redirected to `/admin` dashboard.

## Logging In as User

### User Login

Use the left form on `/login` page:

- Email/password or Google sign-in
- Redirects to `/` (home) or `/user` pages
- Users are blocked from accessing `/admin`

## Security Features

1. **Separation of Concerns**:

   - Admins stored in separate `Admin` collection
   - Users stored in `User` collection
   - No mixing of roles

2. **Secret Protection**:

   - Admin creation requires secret key
   - Admin login requires secret key
   - Prevents unauthorized admin creation

3. **Session Management**:

   - Admin sessions stored in localStorage
   - Firebase sessions for regular users
   - Layout guards prevent unauthorized access

4. **Route Protection**:
   - `/admin/*` routes check for admin session
   - `/user/*` routes check for Firebase user session
   - Automatic redirects for unauthorized access

## API Endpoints

### Admin Registration

```
POST /api/admin/register
Body: {
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "SecurePassword123",
  "secret": "SuperSecretAdminKeyhehehe"
}
```

### Admin Login

```
POST /api/admin/auth/login
Body: {
  "email": "admin@example.com",
  "password": "SecurePassword123",
  "secret": "SuperSecretAdminKeyhehehe"
}
```

### Admin Stats (Protected)

```
GET /api/admin/stats
Returns: User counts, lost/found items, pending verifications
```

## Testing Credentials

Create a test admin using these steps:

1. Go to `/register`
2. Scroll to "Create Admin Account" section
3. Enter:
   - Name: Test Admin
   - Email: admin@test.com
   - Password: Admin1234!
   - Secret: SuperSecretAdminKeyhehehe
4. Click "Create Admin"
5. Login at `/login` using admin form with same credentials + secret

## Troubleshooting

### "Invalid admin secret" error

- Check that `ADMIN_CREATION_SECRET` in `.env` matches what you're entering
- Restart dev server after changing `.env`

### Redirect loops

- Clear localStorage: `localStorage.clear()`
- Clear browser cookies
- Restart dev server

### Admin can't access dashboard

- Check browser console for errors
- Verify admin session exists: `localStorage.getItem("adminSession")`
- Ensure MongoDB connection is working

## Development

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`
