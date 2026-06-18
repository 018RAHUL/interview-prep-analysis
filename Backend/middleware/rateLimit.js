import rateLimit from "express-rate-limit";

export const apiLimiter =
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message:
      "Too many requests. Try again later.",
  });

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    message:
      "AI request limit exceeded. Please wait a minute and try again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});