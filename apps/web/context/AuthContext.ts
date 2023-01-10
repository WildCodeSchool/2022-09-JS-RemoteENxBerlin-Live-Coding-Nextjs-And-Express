import { createContext, Dispatch, SetStateAction } from "react";

export const AuthContext = createContext<{
  authToken: string | undefined,
  setAuthToken:  Dispatch<SetStateAction<string | undefined>>,
}>({
  authToken: undefined,
  setAuthToken: (value) => undefined,
});
