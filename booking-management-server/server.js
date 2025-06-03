const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/route');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', bookingRoutes);

app.listen(3000, () => console.log('Backend running on port 3000'));
