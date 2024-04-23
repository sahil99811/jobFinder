const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const respondWithError = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    // Handle case when user is not found
    if (!user) {
      return respondWithError(res, 401, 'User not registered. Please sign up.');
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      // Generate JWT token
      const token = generateToken(user);
      console.log(token);
      return res.status(200).json({
        success: true,
        token,
        message: 'Login successful',
        name:user.name
      });
    } else {
      return respondWithError(res, 401, 'Invalid credential..');
    }
  } catch (error) {
    console.error('Login error:', error);
    respondWithError(res, 500, 'Login failure. Please try again.');
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, mobileNo, password } = req.body;
    
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // return respondWithError(res, 400, 'User already exists. Please sign in.');
      return res.status(401).json({
        success: false,
        message:"user already exist",
      });

    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      name,
      email,
      mobileNo,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: 'Signup successful',
    });
  } catch (error) {
    console.error('Signup error:', error);
    respondWithError(res, 500, 'Signup failure. Please try again.');
  }
};
