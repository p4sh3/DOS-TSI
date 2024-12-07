const express = require('express');
const rateLimit = require('express-rate-limit')
const app = express();
const PORT = 3000;


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 15,
  message: 'Demasiadas solicitudes, por favor inténtelo más tarde.',
});

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'password') {
    // Consultar DB
    // VALIDAR CREDENCIALES
    // GENERAR TOKEN
    // ....
    const start = Date.now(); // CANTIDAD EN milisegundos
    while (Date.now() - start < 1000) {
      // esperar 1 segundo
    }
    res.json({ success: true, message: 'Login successful', token: 'dummy_jwt_token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/test', (req, res) => {
  res.send('API is working');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error en el servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});















