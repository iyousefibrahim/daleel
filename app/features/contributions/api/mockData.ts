import { Contribution } from "@/app/types/types";

export const initialContributions: Contribution[] = [
  {
    id: 1,
    author: "يمنى ياسين",
    date: "2 أغسطس",
    upvotes: 4,
    downvotes: 0,
    text: "الموظف طلب صورتين للبطاقة",
    verified: true,
  },
  {
    id: 2,
    author: "علي رشاد",
    date: "23 يوليو",
    upvotes: 8,
    downvotes: 1,
    text: "الصبح طابور طويل جدا، روح قبل ما يقفلوا ب10 دقائق",
    verified: false,
  },
  {
    id: 3,
    author: "محمد فرج",
    date: "4 يوليو",
    upvotes: 23,
    downvotes: 0,
    text: "أول مكتب، أستاذ سامح بيخلص الورق بسرعة جدا.",
    verified: false,
  },
  {
    id: 4,
    author: "إيمان نجم",
    date: "1 يونيه",
    upvotes: 110,
    downvotes: 0,
    text: "مفيش ركنات حول المكتب، يفضل استخدام المواصلات.",
    verified: true,
  },
];
