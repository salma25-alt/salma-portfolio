import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export async function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.admin_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Please log in as admin.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.adminId).select('-passwordHash');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Session invalid. Please log in again.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid. Please log in again.',
    });
  }
}
