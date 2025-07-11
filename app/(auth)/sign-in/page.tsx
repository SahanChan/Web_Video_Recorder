"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const handleSignin = async () => {
    return await authClient.signIn.social({ provider: "google" });
  };
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image src={icons.logo} alt="logo" width="32" height="32" />
          <h1>Web Video</h1>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src={icons.star}
                  alt="star"
                  width="20"
                  height="20"
                  key={index}
                />
              ))}
            </figure>
            <p>
              {" "}
              SnapCast makes screen recording easy. From quick walkthroughs to
              full presentations, it&apos;s fast, smooth, and shareable in
              seconds
            </p>
            <article>
              <Image
                src={images.jason}
                alt="jason"
                width="64"
                height="64"
                className="rounded-full"
              />
              <div>
                <h2>Jason Rivera</h2>
                <p>Product desginer at seeduwa</p>
              </div>
            </article>
          </section>
        </div>
        <p>© Snapcast 2025</p>
      </aside>

      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image src={icons.logo} alt="logo" width="40" height="40" />
            <h1>Web Video</h1>
          </Link>
          <p>Create and Share you're very first</p>
          <p>
            Create and share your very first <span>SnapCast video</span> in no
            time!
          </p>
          <button onClick={handleSignin}>
            <Image src={icons.google} alt="google" width="22" height="22" />
            <span>Sign in with Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay"></div>
    </main>
  );
};
export default Page;
