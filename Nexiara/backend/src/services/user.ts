import { Request, Response } from "express";
import UserRepository from "../database/repository/user";
import { ICreateUser } from "../interfaces/user_interfaces";
import { FormatData, FormatError } from "../utils/parser";
import {
  generatePassword,
  generateSignature,
  validatePassword,
  OTPEmailSend,
} from "../utils/encrypt";
import { COOKIE_TOKEN, GOOGLE_CLIENT_ID } from "../config";
const { OAuth2Client } = require("google-auth-library");

const userRepository = new UserRepository();

class UserService {
  // loging through google
  async googleLogin(req: Request, res: Response) {
    try {
      const { tokenId } = req.body;
      const client = new OAuth2Client(GOOGLE_CLIENT_ID);

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: GOOGLE_CLIENT_ID,
      });
      
      const { email_verified, email, name, phoneNo } = verify.payload;
      if (!email_verified) {
        res.json({ message: "Email Not Verified" });
      }

      // Check if email already exists
      const emailCount = await userRepository.getUserCountByEmail(email);

      if (emailCount > 0) {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
          return res
            .status(404)
            .json({ error: "User not found. Please check your email." });
        }
        // Generate token
        const token =
          "Bearer " +
          (await generateSignature({
            _id: user._id,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
          }));

        res.cookie(COOKIE_TOKEN as string, token, {
          httpOnly: true,
          secure: true, // Only send cookie over HTTPS
          maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
          sameSite: "none", // Or 'Strict' or 'None', depending on your requirements
        });

        const result = {
          token,
          user,
        };

        const responseData = FormatData(result);
        return res.status(200).json(responseData);
      } else {
        // Generate password hash
        const passwordHash = await generatePassword(email);

        // Create user
        const data: ICreateUser = {
          name,
          password: passwordHash,
          phoneNo,
          email,
          isEmailVerified: true,
        };

        const user = await userRepository.createUser(data);
        if (!user) {
          return res.status(500).json({ error: "User not created" });
        }

        // Generate token
        const token =
          "Bearer " +
          (await generateSignature({
            _id: user._id,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
          }));

        res.cookie(COOKIE_TOKEN as string, token, {
          httpOnly: true,
          secure: true, // Only send cookie over HTTPS
          maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
          sameSite: "none", // Or 'Strict' or 'None', depending on your requirements
        });

        const result = {
          token,
          user,
        };

        const response_data = FormatData(result);
        return res.status(200).json(response_data);
      }
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // create user
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, phoneNo, isEmailVerified } = req.body;
      // Check if email already exists
      const emailCount = await userRepository.getUserCountByEmail(email);
      if (emailCount > 0) {
        return res.status(400).json({ error: "email already exists" });
      }

      // Generate password hash
      const passwordHash = await generatePassword(password);

      // Create user
      const data: ICreateUser = {
        name,
        password: passwordHash,
        phoneNo,
        email,
        isEmailVerified,
      };

      const user = await userRepository.createUser(data);
      if (!user) {
        return res.status(500).json({ error: "User not created" });
      }

      // Generate token
      const token =
        "Bearer " +
        (await generateSignature({
          _id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        }));

      res.cookie(COOKIE_TOKEN as string, token, {
        httpOnly: true,
        secure: true, // Only send cookie over HTTPS
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        sameSite: "none", // Or 'Strict' or 'None', depending on your requirements
      });

      const result = {
        token,
        user,
      };

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // login user
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Check if email or name exists
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found. Please check your email." });
      }

      // Check if password matches
      const isPasswordMatch = await validatePassword(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ error: "Invalid email / name or password" });
      }

      // Generate token
      const token =
        "Bearer " +
        (await generateSignature({
          _id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        }));

      res.cookie(COOKIE_TOKEN as string, token, {
        httpOnly: true,
        secure: true, // Only send cookie over HTTPS
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        sameSite: "none", // Or 'Strict' or 'None', depending on your requirements
      });

      const result = {
        token,
        user,
      };

      const responseData = FormatData(result);
      return res.status(200).json(responseData);
    } catch (error) {
      const responseData = FormatError(error);
      return res.status(500).json(responseData);
    }
  }

  // logout user
  async logoutUser(req: Request, res: Response) {
    try {
      res.clearCookie(COOKIE_TOKEN as string);
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      const responseData = FormatError(error);
      return res.status(500).json(responseData);
    }
  }

  // send otp
  async SendOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const emailCount = await userRepository.getUserCountByEmail(email);
      if (emailCount === 0) {
        return res.status(400).json({ error: "email not exists" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      const emailData = {
        email,
        otp,
      };
      await OTPEmailSend(emailData);

      const user = await userRepository.SendOtp(email, otp);
      if (!user) {
        return res.status(500).json({ error: "User not updated" });
      }

      const response_data = FormatData(user);
      return res.status(200).json(response_data);
    } catch (error) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // verify otp
  async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;

      // Update user
      const user = await userRepository.verifyOpt(email, otp);
      if (!user) {
        return res.status(500).json({ error: "User not updated" });
      }

      const token =
        "Bearer " +
        (await generateSignature({
          _id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        }));

      res.cookie(COOKIE_TOKEN as string, token, {
        httpOnly: true,
        secure: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        sameSite: "none",
      });

      const result = {
        token,
        user,
      };

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // update user
  async updateUser(req: any, res: Response) {
    try {
      const { ...data } = req.body;
      const { _id: id } = req.user;

      // Update user
      const user = await userRepository.updateUserById(id, data);
      if (!user) {
        return res.status(500).json({ error: "User not updated" });
      }

      // Generate token
      const token =
        "Bearer " +
        (await generateSignature({
          _id: user._id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        }));

      res.cookie(COOKIE_TOKEN as string, token, {
        httpOnly: true,
        secure: true, 
        maxAge: 10 * 24 * 60 * 60 * 1000, 
        sameSite: "none",
      });

      const result = {
        token,
        user,
      };

      const response_data = FormatData(result);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // delete user
  async deleteUser(req: any, res: Response) {
    try {
      const { _id: id } = req.user;

      // Delete user
      const user = await userRepository.deleteUserById(id);
      if (!user) {
        return res.status(500).json({ error: "User not deleted" });
      }

      const response_data = FormatData(user);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // get user by id
  async getUserById(req: any, res: Response) {
    try {
      const { _id: id } = req.user;

      // Get user
      const user = await userRepository.getUserById(id);
      if (!user) {
        return res.status(500).json({ error: "User not found" });
      }

      const response_data = FormatData(user);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // get user by name
  async getUserByName(req: Request, res: Response) {
    try {
      const { name } = req.body;

      // Get user
      const user = await userRepository.getUserByName(name);
      if (!user) {
        return res.status(500).json({ error: "User not found" });
      }

      const response_data = FormatData(user);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }

  // get user by email
  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Get user
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        return res.status(500).json({ error: "User not found" });
      }

      const response_data = FormatData(user);
      return res.status(200).json(response_data);
    } catch (error: any) {
      const response_data = FormatError(error);
      return res.status(400).json(response_data);
    }
  }
}

export default UserService;
