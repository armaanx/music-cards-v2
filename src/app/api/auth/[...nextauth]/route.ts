// import { handlers } from "@/auth";
// export const { GET, POST } = handlers;
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";

const SPOTIFY_SCOPES = ["user-top-read", "user-read-email"];

const params = {
  scope: SPOTIFY_SCOPES.join(" "),
};

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;
const TOKEN_URL = "https://accounts.spotify.com/api/token";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(
      `${process.env.AUTH_SPOTIFY_ID}:${process.env.AUTH_SPOTIFY_SECRET}`
    ).toString("base64");
    const { data } = await axios.post(
      TOKEN_URL,
      {
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      },
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Refreshed access token:", data);
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    };
  } catch (error) {
    console.log("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  } finally {
    console.log("Refreshed access token function accessed.");
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID!,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpires!) {
        return token;
      }
      //refreshToken
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  events: {
    async signIn({ user }) {
      console.log("User signed in:", user.email);
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
