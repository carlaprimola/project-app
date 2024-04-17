import {z} from 'zod' 

//Validar registro
export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido"
  }),
  email: z.string({
    required_error: "El correo electrónico es requerido",
    
  }).email({
    message: "Correo inválido"
  }),
  password: z.string({
    required_error: "La contraseña es requerida",
    })
    .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"})
    })

//Validar login
export const loginSchema = z.object({
    email: z.string({
      required_error: "El correo electrónico es requerido",
        
      }).email({
      message: "Correo inválido"
      }),
    password: z.string({
       required_error: "La contraseña es requerida",
        })
        .min(6, {
       message: "La contraseña debe tener al menos 6 caracteres"})
})
