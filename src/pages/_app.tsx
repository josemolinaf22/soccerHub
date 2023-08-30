import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { SideNav } from "~/Components/SideNav";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className="bg-gray-900">
      <SessionProvider session={session}>
        <Head>
          <title>SoccerHub</title>
          <meta
            name="descritpion"
            content="Website to help you find who is playing in your area!"
          />
        </Head>
        <div className="container mx-auto flex items-start font-sans text-xl text-white sm:pr-4">
          <SideNav />
          <div className="min-h-screen flex-grow ">
            <Component {...pageProps} />
          </div>
        </div>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
