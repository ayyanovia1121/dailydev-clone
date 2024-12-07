class Env {
  // Noted : as string means it will be a string and not undefined.
  // Backend API URL
  static API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  // Frontend URL
  static APP_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
}

export default Env;

