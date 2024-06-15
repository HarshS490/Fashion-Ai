"use server";

import LoginForm from "./LoginForm";
import Image from "next/image";
import GoogleLoginButton from "./GoogleLoginButton";
import GithubLoginButton from "./GithubLoginButton";

const Page = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center sm:bg-blue-100">
      <div className="flex h-full w-full items-center gap-7 rounded-xl p-12 sm:h-3/4 sm:w-3/4 sm:items-start sm:bg-white">
        <div className="-mt-4 flex w-1/3 min-w-64 flex-1 flex-col gap-3">
          <h1 className="text-center text-6xl tracking-tighter">Login✌️</h1>
          <p className="text-center text-muted-foreground">
            Get started at{" "}
            <span className="font-bold text-purple-400 drop-shadow-[0_1px_1px_rgba(192,132,252,0.6)]">
              Fashion-AI
            </span>
          </p>
          {/* OAuth Options */}
          <div className="mt-2 flex flex-col gap-3">
            <GoogleLoginButton />
            <GithubLoginButton />
          </div>
          {/* Separator */}
          <div className="flex items-center gap-2">
            <div className="h-px grow bg-muted"></div>
            <p className="text-xs tracking-wide text-muted-foreground">
              or sign in with Email
            </p>
            <div className="h-px grow bg-muted"></div>
          </div>
          {/* Email login */}
          <LoginForm />
        </div>
        <div
          className="relative hidden h-full w-full flex-1 md:block"
          aria-hidden
        >
          <Image
            src="/login-page.jpg"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
