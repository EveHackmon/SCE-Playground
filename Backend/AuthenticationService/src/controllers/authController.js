// authentication-service/src/controllers/authController.js
import { authService } from '../services/authService.js';

export async function signup(req, res, next) {
  try {
    const {
      email,
      password,
      firstName,
      lastName
    } = req.body;

    console.log('Got signup request: ', email, ' and password: ', password);
    

    const newUser = await authService.signup(
      email,
      password,
      firstName,
      lastName
    );
    // newUser will not include password
    return res.status(201).json(newUser);
  } catch (error) {
    return next(error);
  }
}

export async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log('Got signin request: ', email, ' and password: ', password);
    const userAndToken = await authService.signin(email, password);
    return res.status(200).json(userAndToken);
  } catch (error) {
    return next(error);
  }
}

export async function validateToken(req, res, next) {
  try {
    const { token } = req.body;
    const isValid = await authService.validateToken(token);
    return res.status(200).json({ isValid });
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { email } = req.query;
    await authService.deleteUser(email);
    return res.status(204).send(); // no content
  } catch (error) {
    return next(error);
  }
}

export async function ping(req, res, next) {
  try {
    return res.status(200).json({ message: 'pong' });
  } catch (error) {
    return next(error);
  }
}