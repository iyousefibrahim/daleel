import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";

const useCategories = () => {
  const getCategoriesQuery = (limit?: number) =>
    useQuery({
      queryKey: ["categories", limit], 
      queryFn: () => getCategories(limit),
    });

  return { getCategoriesQuery };
};

export default useCategories;
