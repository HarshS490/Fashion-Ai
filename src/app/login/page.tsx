"use server";

import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import Image from "next/image";

const GoogleLoginButton = () => {
  return (
    <Button
      variant="outline"
      className="flex items-center rounded-3xl text-zinc-900"
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="mr-2 block h-5 w-5"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        ></path>
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        ></path>
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        ></path>
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        ></path>
        <path fill="none" d="M0 0h48v48H0z"></path>
      </svg>
      Sign in with Google
    </Button>
  );
};

const GithubLoginButton = () => {
  return (
    <Button
      variant="outline"
      className="flex items-center rounded-3xl text-zinc-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="mr-2"
        width="20px"
        height="40px"
        viewBox="0 0 20 19"
        version="1.1"
      >
        <g id="surface3">
          <path
            style={{
              stroke: "none",
              fillRule: "evenodd",
              fill: "rgb(14.117647%,16.078431%,18.431373%)",
              fillOpacity: "1",
            }}
            d="M 10.074219 0 C 4.503906 0 0 4.398438 0 9.84375 C 0 14.195312 2.886719 17.878906 6.886719 19.179688 C 7.386719 19.28125 7.570312 18.96875 7.570312 18.710938 C 7.570312 18.480469 7.554688 17.699219 7.554688 16.882812 C 4.753906 17.46875 4.167969 15.710938 4.167969 15.710938 C 3.71875 14.570312 3.050781 14.277344 3.050781 14.277344 C 2.132812 13.671875 3.117188 13.671875 3.117188 13.671875 C 4.136719 13.738281 4.667969 14.683594 4.667969 14.683594 C 5.570312 16.183594 7.019531 15.757812 7.605469 15.5 C 7.6875 14.863281 7.953125 14.421875 8.238281 14.179688 C 6.003906 13.949219 3.652344 13.101562 3.652344 9.320312 C 3.652344 8.246094 4.050781 7.367188 4.6875 6.683594 C 4.585938 6.4375 4.234375 5.425781 4.785156 4.074219 C 4.785156 4.074219 5.636719 3.8125 7.554688 5.085938 C 8.375 4.867188 9.222656 4.757812 10.074219 4.757812 C 10.921875 4.757812 11.789062 4.871094 12.589844 5.085938 C 14.507812 3.8125 15.359375 4.074219 15.359375 4.074219 C 15.910156 5.425781 15.558594 6.4375 15.460938 6.683594 C 16.109375 7.367188 16.492188 8.246094 16.492188 9.320312 C 16.492188 13.101562 14.140625 13.933594 11.890625 14.179688 C 12.257812 14.488281 12.574219 15.074219 12.574219 16.003906 C 12.574219 17.324219 12.558594 18.382812 12.558594 18.707031 C 12.558594 18.96875 12.742188 19.28125 13.242188 19.179688 C 17.242188 17.878906 20.128906 14.195312 20.128906 9.84375 C 20.144531 4.398438 15.625 0 10.074219 0 Z M 10.074219 0 "
          />
        </g>
      </svg>
      Sign in with GitHub
    </Button>
  );
};

const Page = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center md:bg-blue-100">
      <div className="flex h-full w-full items-center gap-7 rounded-xl p-12 md:h-3/4 md:w-3/4 md:items-start md:bg-white">
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
