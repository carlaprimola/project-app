import { Router } from "express";
import { login, logout, register, profile, verifyToken } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import rateLimit from "express-rate-limit";

const router = Router()


// Configuración de límite de intentos
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 3, // 3 intentos
    message: 'Has excedido el límite de intentos. Por favor, inténtalo más tarde.',
    headers: true,
    handler: function(req, res) {
      console.log('Se ha superado el límite de intentos para esta ruta.');
      res.status(429).send('Has excedido el límite de intentos. Por favor, inténtalo más tarde.');
      toast.error('Has excedido el límite de intentos. Por favor, inténtalo más tarde.');
    }
  }); 
 


router.post('/register', limiter, validateSchema(registerSchema), register)  
router.post('/login', limiter, validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/profile', authRequired, profile)

export default router;