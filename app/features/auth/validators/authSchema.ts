import z from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email غير صحيح"),
  password: z.string().min(6, "Password يجب أن يكون 6 حروف على الأقل"),
  username: z.string().min(3, "Username يجب أن يكون 3 حروف على الأقل"),
  first_name: z.string().min(3, "First name يجب أن يكون 3 حروف على الأقل"),
  last_name: z.string().min(3, "Last name يجب أن يكون 3 حروف على الأقل"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل"),
});