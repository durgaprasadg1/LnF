
export function getAuthErrorMessage(error) {
  const errorCode = error?.code || "";

  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address";
    case "auth/user-disabled":
      return "This account has been disabled";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-credential":
      return "Invalid email or password";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later";

    case "auth/email-already-in-use" || "":
      return "An account with this email already exists";
    case "auth/weak-password":
      return "Password should be at least 6 characters";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled";

    case "auth/popup-closed-by-user":
      return "Sign-in cancelled";
    case "auth/popup-blocked":
      return "Pop-up blocked. Please allow pop-ups for this site";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email";

    case "auth/network-request-failed":
      return "Network error. Please check your connection";

    case "auth/internal-error":
      return "Something went wrong. Please try again";

    default:
      return "An error occurred. Please try again";
  }
}
