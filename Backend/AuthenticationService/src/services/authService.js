// authentication-service/src/services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../data-access/userModel.js';

export const authService = {
  async signup(email, password, firstName, lastName) {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const err = new Error('Email already in use.');
      err.status = 400;
      throw err;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    // Return user without password
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
  },

  async signin(email, password) {
    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    // Generate token with user details
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    // Return user without password
    // and with token
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    };
  },

  async validateToken(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (error) {
      return false;
    }
  },

  async deleteUser(email) {
    if (!email) {
      const err = new Error('Email is required to delete user');
      err.status = 400;
      throw err;
    }
    await User.destroy({ where: { email } });
  }
};