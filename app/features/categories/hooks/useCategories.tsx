import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";
import { Category } from "@/app/types/types";

const useCategories = () => {
  const getCategoriesQuery = (limit?: number) =>
    useQuery<Category[]>({
      queryKey: ["categories", limit], 
      queryFn: () => getCategories(limit),
    });

  return { getCategoriesQuery };
};

export default useCategories;
