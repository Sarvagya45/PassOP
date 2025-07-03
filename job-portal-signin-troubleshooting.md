# Job Portal Sign-In Database Storage Issue - Troubleshooting Guide

## Common Causes and Solutions

### 1. **Database Connection Issues**

**Problem:** Users not stored because database connection is failing.

**Check:**
```javascript
// In your server.js or app.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
```

**Solution:**
- Verify MongoDB is running
- Check connection string
- Ensure database credentials are correct
- Check network connectivity

### 2. **User Model Schema Issues**

**Problem:** User data not saving due to schema validation errors.

**Check your User model:**
```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['applicant', 'recruiter'],
    default: 'applicant'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

### 3. **Registration/Sign-up Controller Issues**

**Problem:** Controller not properly saving user to database.

**Fix the registration controller:**
```javascript
// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // Will be hashed by pre-save middleware
      role
    });

    // Save user to database
    const savedUser = await user.save();
    
    console.log('User saved successfully:', savedUser._id); // Debug log

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error); // Debug log
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

module.exports = { register };
```

### 4. **Frontend Form Submission Issues**

**Problem:** Frontend not sending data correctly to backend.

**Check your React registration form:**
```jsx
// components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'applicant'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Registration response:', response.data); // Debug log

      if (response.data.success) {
        // Store token
        localStorage.setItem('token', response.data.token);
        // Redirect or update state
        alert('Registration successful!');
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({...formData, role: e.target.value})}
      >
        <option value="applicant">Job Seeker</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
```

### 5. **API Routes Configuration**

**Problem:** Routes not properly configured.

**Check your routes:**
```javascript
// routes/auth.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;

// In your main app.js
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
```

### 6. **Environment Variables**

**Problem:** Missing or incorrect environment variables.

**Create .env file:**
```env
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

### 7. **Debugging Steps**

**Add these debugging logs to identify the issue:**

```javascript
// In your registration controller
const register = async (req, res) => {
  console.log('1. Registration request received:', req.body);
  
  try {
    console.log('2. Checking for existing user...');
    const existingUser = await User.findOne({ email: req.body.email });
    
    if (existingUser) {
      console.log('3. User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }
    
    console.log('4. Creating new user...');
    const user = new User(req.body);
    
    console.log('5. Saving user to database...');
    const savedUser = await user.save();
    
    console.log('6. User saved successfully:', savedUser._id);
    
    res.status(201).json({
      success: true,
      user: savedUser
    });
    
  } catch (error) {
    console.error('7. Error during registration:', error);
    res.status(500).json({ message: error.message });
  }
};
```

### 8. **Common Fixes Checklist**

- [ ] **Database Connection**: Verify MongoDB is running and connected
- [ ] **Schema Validation**: Ensure all required fields are provided
- [ ] **Unique Constraints**: Check for duplicate email/username
- [ ] **Password Hashing**: Verify password is being hashed before saving
- [ ] **Error Handling**: Add proper try-catch blocks
- [ ] **CORS**: Ensure frontend can communicate with backend
- [ ] **Environment Variables**: Check all required env vars are set
- [ ] **Network Issues**: Verify API endpoints are accessible
- [ ] **Data Format**: Ensure frontend sends data in correct format
- [ ] **Middleware**: Check if any middleware is blocking the request

### 9. **Testing the Fix**

**Use these tools to test:**

1. **Check database directly:**
```bash
# MongoDB Shell
mongo
use jobportal
db.users.find()
```

2. **Test API with Postman/curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "applicant"
  }'
```

3. **Browser Network Tab:**
   - Open developer tools
   - Go to Network tab
   - Submit registration form
   - Check if request is sent and response received

### 10. **Prevention Tips**

- Always validate data on both frontend and backend
- Use proper error handling and logging
- Test database operations separately
- Implement proper CORS configuration
- Use environment variables for sensitive data
- Add database indexes for better performance
- Implement rate limiting for security

---

## Quick Fix Commands

If you have access to the project files, try these:

1. **Check if MongoDB is running:**
```bash
sudo systemctl status mongod
# or
brew services list | grep mongodb
```

2. **Install missing dependencies:**
```bash
npm install mongoose bcryptjs jsonwebtoken
```

3. **Test database connection:**
```javascript
// test-db.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jobportal')
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB Error:', err));
```

4. **Run the application with debug logs:**
```bash
DEBUG=* npm start
```

Would you like me to help you implement any of these specific fixes, or do you have access to your project files so I can take a closer look at the actual code?