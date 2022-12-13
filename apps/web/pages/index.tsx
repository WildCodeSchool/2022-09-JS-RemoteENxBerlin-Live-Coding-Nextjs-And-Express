import { Button } from "ui";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

interface User {
  id: number | string;
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}

export default function Web({ initialUsers }: { initialUsers: User[] }) {
  // Client Side Rendering: The useState and useEffect will be executed in the React
  // app after loading the page once client JS takes over.
  const [users, setUsers] = useState<User[]>(initialUsers);
  useEffect(() => {
    axios
      .get<User[]>("http://localhost:5050/api/users")
      .then((response) => response.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Web</h1>
      <Button />
      <ul>
        {users.map((user) => (
          <li>
            <ul>
              <li>id: {user.id}</li>
              <li>email: {user.email}</li>
              <li>hashedPassword: {user.hashedPassword}</li>
              <li>firstName: {user.firstName}</li>
              <li>lastName: {user.lastName}</li>
              <li>birthdate: {user.birthdate}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Server Side Rendering: we provide the props to the component that are
// used to prerender before the client sees the page.
export const getServerSideProps: GetServerSideProps = async () => {
  const users = await axios
    .get<User[]>("http://localhost:5050/api/users")
    .then((response) => response.data);
  return {
    props: {
      initialUsers: users
    },
  };
};
