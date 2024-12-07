import { LOGIN_URL } from "@/lib/apiEndPoint";
import axiosApi from "@/lib/axios.config";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  profile_image?: string | null;
  token?: string | null;
  created_at?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
        if(user){
          token.user = user
        }
        return token
    },
    async session({session, token,user }:{session:CustomSession, token:JWT, user:CustomUser}){ 
      session.user = token.user as CustomUser
      return session
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await axiosApi.post(LOGIN_URL, credentials);
        const response = await res.data;
        const user = response.user;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
