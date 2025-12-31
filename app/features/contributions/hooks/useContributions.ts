import { Contribution } from "@/app/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../auth/hooks/useAuth";
import {
  addContribution,
  contributionsUpdatedAt,
  getContributions,
} from "../api/contributions";

export const useContributions = (serviceId?: string) => {
  const { userSession } = useAuth();
  const queryClient = useQueryClient();

  const getContributionsQuery = useQuery<Contribution[]>({
    queryKey: ["contributions", serviceId],
    queryFn: () => getContributions(serviceId),
    enabled: !!serviceId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const addContributionMutation = useMutation({
    mutationFn: (content: string) => {
      if (!serviceId || !userSession?.id) {
        throw new Error("Missing serviceId or userId");
      }
      return addContribution(content, serviceId, userSession.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions", serviceId] });
      queryClient.invalidateQueries({
        queryKey: ["contributions-updated-at", serviceId],
      });
    },
  });

  const contributionsUpdatedAtQuery = useQuery({
    queryKey: ["contributions-updated-at", serviceId],
    queryFn: () => contributionsUpdatedAt(serviceId),
    enabled: !!serviceId,
    staleTime: 1000 * 60, // 1 minute
  });

  return {
    addContributionMutation,
    getContributionsQuery,
    contributionsUpdatedAtQuery,
  };
};
