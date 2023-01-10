import type { AppProps } from "next/app";
import { AuthContext } from "../context/AuthContext";

import { Button } from "ui";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import type { UserModel as User } from "types/src/dbModel/user";
import type { LoginResponseData } from "types/src/api/auth";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    if (authToken != null || window == null) return;

    const authTokenFromLocalStorage = window.localStorage.getItem("auth_token");
    if (authTokenFromLocalStorage != null) {
      setAuthToken(authTokenFromLocalStorage);
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: "david@wcs.dev",
        password: "wilder123",
      })
      .then((res: AxiosResponse<LoginResponseData>) => {
        console.log(res);
        const token = res.data.token;
        if (token == null) {
          console.error("No token!", res.data.error);
          return;
        }
        setAuthToken(token);
        window.localStorage.setItem("auth_token", token);
      })
      .catch((err) => console.error(err));
  }, [authToken]);
  return (
    <AuthContext.Provider
      value={{ authToken: authToken, setAuthToken: setAuthToken }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
