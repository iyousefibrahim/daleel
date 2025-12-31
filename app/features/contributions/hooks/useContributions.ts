import { useState } from "react";
import { initialContributions } from "../api/mockData";
import { Contribution } from "@/app/types/types";

export const useContributions = () => {
  const [contributions, setContributions] =
    useState<Contribution[]>(initialContributions);
  const [inputText, setInputText] = useState("");

  const handleVote = (id: number, type: "up" | "down") => {
    setContributions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            upvotes: type === "up" ? item.upvotes + 1 : item.upvotes,
            downvotes: type === "down" ? item.downvotes + 1 : item.downvotes,
          };
        }
        return item;
      })
    );
  };

  const handleAddContribution = () => {
    if (inputText.trim().length === 0) return;

    const newContribution: Contribution = {
      id: Date.now(),
      author: "أنت",
      date: "الآن",
      upvotes: 0,
      downvotes: 0,
      text: inputText,
      verified: false,
    };

    setContributions([newContribution, ...contributions]);
    setInputText("");
  };

  return {
    contributions,
    inputText,
    setInputText,
    handleVote,
    handleAddContribution,
  };
};
