import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}

// POST /api/auth/login
export async function loginAdmin(req, res, next) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('admin_token', token, getCookieOptions());

    res.json({
      success: true,
      message: 'Logged in successfully.',
      data: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/logout
export function logoutAdmin(req, res) {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  });

  res.json({
    success: true,
    message: 'Logged out successfully.',
  });
}

// GET /api/auth/me
export function getCurrentAdmin(req, res) {
  res.json({
    success: true,
    data: {
      id: req.admin._id,
      email: req.admin.email,
      lastLoginAt: req.admin.lastLoginAt,
    },
  });
}
