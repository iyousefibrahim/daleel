import { supabase } from "@/app/lib/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useAuthListener() {
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
          // Only clear if it's a critical error, but keep user for now to allow retry
        }

        queryClient.setQueryData(["user"], session?.user ?? null);
      } catch (err) {
        console.error("Unexpected error in fetchSession:", err);
      } finally {
        setReady(true);
      }
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change event:", event);
        queryClient.setQueryData(["user"], session?.user ?? null);

        if (event === "SIGNED_OUT" || (event as any) === "USER_DELETED") {
          queryClient.clear();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [queryClient]);

  return ready;
}
