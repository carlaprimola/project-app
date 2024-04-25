// Schema de autenticación para el front
import { z } from "zod";
import validator from 'validator';
import xss from 'xss'; //libreria para prevenir ataques XSS, ayuda a limpiar los datos de entrada

//Funcion para validar si el email es válido
function isValidEmail(email) {
  email = email.trim().toLowerCase(); //elimina espacios y transforma el texto en minusculas
  return email.length <= 100 && validator.isEmail(email); //menos de 100 caracteres y valida formato email
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
    })
    .max(10,{
      message: "Username debe tener máximo 10 caracteres",
    }),
  email: z
    .string()
    .nonempty({
      message: "El email es obligatorio",
    })
    .refine((value) => {
      // Validar si el formato del correo electrónico no es correcto utilizando la función isValidEmail
      return isValidEmail(value);
    }, {
      message: "El formato del email no es válido",
    }),
  password: z.string().min(6, {
    message: "La contraseña debe tener mínimo 6 caracteres",
  }),
  honeypot: z.string().optional(),
  timestamp: z.string().optional(),
});


// Función para limpiar y validar los datos de entrada
export function cleanAndValidate(data, schema) {
  // Limpiar los datos de entrada
  const cleanData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, xss(value)])
  );

  // Validar los datos limpios
  return schema.parse(cleanData);
}
