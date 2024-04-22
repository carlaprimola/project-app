// Schema de autenticación para el front
import { z } from "zod";

// Función para verificar si el correo electrónico es válido
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Login
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
  }),
});

// Register
export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username es obligatorio",
    })
    .min(3, {
      message: "Username debe tener mínimo 3 caracteres",
    }),
  email: z
    .string()
    .nonempty({
      message: "El email es obligatorio",
    })
    .refine((value) => {
      // Validar si el formato del correo electrónico no es correcto utilizando una expresión regular
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }, {
      message: "El formato del email no es válido",
    }),
  password: z.string().min(6, {
    message: "La contraseña debe tener mínimo 6 caracteres",
  }),
});

