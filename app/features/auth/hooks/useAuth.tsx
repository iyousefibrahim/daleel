import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginWithPassword, logOut, register } from "../api/auth";
import { getUserSession } from "../api/auth";

function useAuth() {
  const queryClient = useQueryClient();

  const userSession = useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
    staleTime: Infinity,
  });

  const registerMutation = useMutation({
    mutationFn: ({
      email,
      password,
      username,
      full_name,
    }: {
      email: string;
      password: string;
      username: string;
      full_name: string;
    }) => register(email, password, username, full_name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const loginWithPasswordMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginWithPassword(email, password),
    onSuccess: (data) => {
      console.log("Login with password success", data);
      queryClient.setQueryData(["user"], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });

  return {
    userSession: userSession.data,
    loginWithPasswordMutation,
    logoutMutation,
    registerMutation,
  };
}

export default useAuth;
