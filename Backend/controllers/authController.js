import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("Missing fields");
      res.status(400);
      throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("User already exists");
      res.status(400);
      throw new Error("User already exists");
    }

    //Security
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;

    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must contain uppercase, lowercase, number and special character."
      );
    }

    // Create user (password auto-hashed via pre-save middleware)
    const user = await User.create({
      name,
      email,
      password,
    });

    // Response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data:{
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: user.generateToken(),
    });

  } catch (error) {
    next(error);
  }
};



// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    // Find user + include password
    const user = await User.findOne({ email }).select("+password");

    // Check user + password
    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        success: true,
        message: "User logged in successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },        
        token: user.generateToken(),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }

  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req,
  res,
  next
) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const protect = async (
  req,
  res,
  next
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(
      "Bearer"
    )
  ) {
    try {
      token =
        req.headers.authorization.split(
          " "
        )[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(
        decoded.id
      ).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error(
        "Not authorized"
      );
    }
  }

  if (!token) {
    res.status(401);
    throw new Error(
      "No token provided"
    );
  }
};