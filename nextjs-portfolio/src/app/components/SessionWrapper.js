// src/app/components/SessionWrapper.js
"use client";

import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;