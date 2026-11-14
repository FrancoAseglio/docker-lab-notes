const express    = require('express');
const morgan     = require('morgan');
const connectDB  = require('./config/db');
const itemRoutes = require('./routes/itemRoutes');
const { swaggerUi, swaggerDocs } = require('./config/swagger');

const app  = express();
const PORT = process.env.MONGO_PORT_INTERNAL || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
