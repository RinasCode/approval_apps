require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const budgetRequestRoutes = require('./routes/budgetRequestRoutes');
const approvalRoutes = require('./routes/approvalRoutes');
const cors = require('cors');

require('dotenv').config();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes); 
app.use('/users', userRoutes); 
app.use('/budget-requests', budgetRequestRoutes); 
app.use("/approvals", approvalRoutes); 

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
