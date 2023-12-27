const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../config/db');
const { where } = require("sequelize");
const User = require("../models/user");

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust this value for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the specified role
    const user = await User.create({ username, password: hashedPassword });

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    

    // Find the user by username
    const user = await User.findOne({
      where: { username },
     
    });
    

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
      
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate and send a JWT token upon successful login
    const token = jwt.sign({ userId: user.id,roleId:user.roleId , permission: user}, 'your-secret-key', {
     // Token expires in 1 hour (adjust as needed)
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Create user (admin-only)

// Get all users (admin-only)







