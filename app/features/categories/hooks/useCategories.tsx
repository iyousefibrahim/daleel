import { Category } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";

const useCategories = () => {
  const getCategoriesQuery = (limit?: number) =>
    useQuery<Category[]>({
      queryKey: ["categories", limit],
      queryFn: () => getCategories(limit),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    });

  return { getCategoriesQuery };
};

export default useCategories;
