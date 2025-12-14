import { useMutation, useQueryClient } from "@tanstack/react-query";
import register from "../api/auth";

function useAuth() {
  const queryClient = useQueryClient();

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

  return {
    registerMutation,
  };
}

export default useAuth;
