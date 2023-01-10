import type { UserModel as User } from "types/src/dbModel/user";

export default function UserList({users}: {users: User[]}) {
  return (
    <ul>
        {users.map((user) => (
          <li key={user.id}>
            <ul>
              <li>id: {user.id}</li>
              <li>email: {user.email}</li>
              <li>hashedPassword: {user.hashedPassword}</li>
              <li>firstName: {user.firstName}</li>
              <li>lastName: {user.lastName}</li>
              <li>birthdate: {user.birthdate?.toString()}</li>
            </ul>
          </li>
        ))}
      </ul>
  )
}
