import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Introduce un email válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener mínimo 6 caracteres",
  }).refine((data) => {    
    if (data.password === "contraseñaIncorrecta") {
      throw new Error("Contraseña incorrecta");
    }    
    return true;
  })
});

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "Username es obligatorio",
      })
      .min(3, {
        message: "Username debe tener mínimo 3 caracteres",
      }),
    email: z.string().email({
      message: "Introduce un email válido",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener mínimo 6 caracteres",
    }),
  })
 