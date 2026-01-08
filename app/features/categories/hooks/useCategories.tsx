import { Category } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import { getCategories, searchCategories } from "../api/categories";

const useCategories = () => {
  const getCategoriesQuery = (limit?: number) =>
    useQuery<Category[]>({
      queryKey: ["categories", limit],
      queryFn: () => getCategories(limit),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });

  const searchCategoriesQuery = (query: string) =>
    useQuery<Category[]>({
      queryKey: ["categories", "search", query],
      queryFn: () => searchCategories(query),
      enabled: !!query,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });

  return { getCategoriesQuery, searchCategoriesQuery };
};

export default useCategories;
