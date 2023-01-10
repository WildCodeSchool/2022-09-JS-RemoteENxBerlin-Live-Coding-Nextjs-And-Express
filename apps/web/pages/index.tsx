import { Button } from "ui";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import type { UserModel as User } from "types/src/dbModel/user";
import type { LoginResponseData } from "types/src/api/auth";

import UserList from "../components/UserList";

const API_URL = "http://localhost:5050/api";

export default function Web({ initialUsers }: { initialUsers?: User[] }) {
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    if (authToken != null || window == null) return;
    
    const authTokenFromLocalStorage = window.localStorage.getItem("auth_token");
    if (authTokenFromLocalStorage != null) {
      setAuthToken(authTokenFromLocalStorage);
      return;
    }
    
    axios
      .post(`${API_URL}/auth/login`, {
        email: "david@wcs.dev",
        password: "wilder123",
      })
      .then((res: AxiosResponse<LoginResponseData>) => {
        console.log(res);
        const token = res.data.token;
        if(token == null) {
          console.error("No token!", res.data.error);
          return;
        }
        setAuthToken(token);
        window.localStorage.setItem("auth_token", token);
      })
      .catch((err) => console.error(err));
  }, [authToken]);

  // Client Side Rendering: The useState and useEffect will be executed in the React
  // app after loading the page once client JS takes over.
  const [users, setUsers] = useState<User[]>(initialUsers ?? []);
  useEffect(() => {
    axios
      .get<User[]>(`${API_URL}/users`)
      .then((response) => response.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Web</h1>
      <Button />
      <UserList users={users} />
    </div>
  );
}

// Server Side Rendering: we provide the props to the component that are
// used to prerender before the client sees the page.
// export const getServerSideProps: GetServerSideProps = async () => {
//   const users = await axios
//     .get<User[]>("http://localhost:5050/api/users")
//     .then((response) => response.data);
//   return {
//     props: {
//       initialUsers: users,
//     },
//   };
// };
