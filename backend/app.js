require('dotenv').config();
const express = require('express');
const app = express();
const corsMiddleware = require('./middlewares/corsMiddleware');
const authenticate = require('./middlewares/authenticate');
const logger = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const busesRoutes = require('./routes/buses.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const authRoutes = require('./routes/auth.routes');

const PORT = 3000;

app.use(corsMiddleware);
app.use(express.json());
app.use(logger.logger);

app.use('/buses', authenticate, busesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/auth', authRoutes);

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
