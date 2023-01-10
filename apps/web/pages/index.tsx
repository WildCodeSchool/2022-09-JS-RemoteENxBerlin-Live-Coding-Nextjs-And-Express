import { Button } from "ui";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import type { UserModel as User } from "types/src/dbModel/user";
import type { LoginResponseData } from "types/src/api/auth";

import UserList from "../components/UserList";

export default function Web({ initialUsers }: { initialUsers?: User[] }) {
  // Client Side Rendering: The useState and useEffect will be executed in the React
  // app after loading the page once client JS takes over.
  const [users, setUsers] = useState<User[]>(initialUsers ?? []);
  useEffect(() => {
    axios
      .get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then((response) => response.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
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
