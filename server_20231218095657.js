// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3002;

// Connect to MongoDB (replace 'your-database-url' with your actual MongoDB URL)
mongoose.connect('mongodb+srv://prakhar2227:<password>@cluster0.jpfqjrh.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  batch: String,
});

const User = mongoose.model('User', userSchema);

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// API endpoint to handle form submissions
app.post('/submitForm', async (req, res) => {
  try {
    // Basic validation (you can add more based on your requirements)
    const { name, age, batch } = req.body;

    if (!name || !age || !batch) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save user data to MongoDB
    const newUser = new User({
      name,
      age,
      batch,
    });

    await newUser.save();

    // Simulate payment (Replace with actual payment gateway integration)
    const paymentResponse = CompletePayment(req.body);

    // Return response to frontend based on payment response
    if (paymentResponse.success) {
      res.status(200).json({ message: 'Form submitted successfully', paymentResponse });
    } else {
      res.status(400).json({ error: 'Payment failed', paymentResponse });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Mock function for payment (replace with actual payment gateway integration)
function CompletePayment(userDetails) {
  // Perform payment logic here
  // This is a mock function, so just returning a success response
  return { success: true, message: 'Payment successful' };
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
