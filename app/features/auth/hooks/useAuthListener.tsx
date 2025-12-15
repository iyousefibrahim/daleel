import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/app/lib/supabaseClient";

export default function useAuthListener() {
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      queryClient.setQueryData(["user"], user ?? null);
      setReady(true);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        queryClient.setQueryData(["user"], session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [queryClient]);

  return ready;
}
