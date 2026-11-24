import ContactMessage from '../models/ContactMessage.js';

// POST /api/contact — Public contact form submission
export async function submitContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    const saved = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: { id: saved._id },
    });
  } catch (error) {
    next(error);
  }
}
