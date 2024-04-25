//ejecutar aplicacion
import app from './app.js';
import connectDB from './db.js';
import path from 'path';

connectDB();
app.listen(3000);
console.log('✨ Servidor conectado', 3000);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});