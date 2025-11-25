import { NextAuthOptions } from "next-auth";

interface TwitchProfile {
  data: Array<{
    id: string;
    login: string;
    display_name: string;
    email: string;
    profile_image_url: string;
  }>;
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "twitch",
      name: "Twitch",
      type: "oauth",
      authorization: {
        url: "https://id.twitch.tv/oauth2/authorize",
        params: {
          scope: "user:read:email",
          claims: JSON.stringify({
            id_token: { email: null, email_verified: null },
            userinfo: { picture: null, preferred_username: null },
          }),
        },
      },
      token: "https://id.twitch.tv/oauth2/token",
      userinfo: "https://api.twitch.tv/helix/users",
      profile(profile: TwitchProfile) {
        return {
          id: profile.data[0].id,
          name: profile.data[0].display_name,
          email: profile.data[0].email,
          image: profile.data[0].profile_image_url,
        };
      },
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const twitchProfile = profile as TwitchProfile;
        token.id = twitchProfile.data[0].id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain: process.env.NEXTAUTH_URL?.includes('vercel.app') 
          ? '.vercel.app' 
          : undefined,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
