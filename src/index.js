//ejecutar aplicacion
import app from './app.js';
import connectDB from './db.js';

connectDB();
app.listen(3000);
console.log('✨ Servidor conectado', 3000);

