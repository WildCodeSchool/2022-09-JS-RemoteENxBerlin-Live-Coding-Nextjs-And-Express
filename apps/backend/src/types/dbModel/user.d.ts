declare interface UserModel {
  id: number | string;
  email: string;
  hashedPassword: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  birthdate: string | Date | undefined;
}