import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

class AuthService {
  private generateToken(id: string) {
    return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
      expiresIn: (process.env.JWT_EXPIRES_IN || "90d") as any,
    });
  }

  async register(data: any) {
    try {
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        return { err: "Email already in use" };
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(data.password, salt);

      const user = await User.create({ ...data, passwordHash });

      const token = this.generateToken(user._id.toString());
      const { passwordHash: _ignoredPasswordHash, ...userObj } = user.toObject();

      return {
        item: { user: userObj, token },
        message: "User registered successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to register user" };
    }
  }

  async login(data: any) {
    try {
      const user = await User.findOne({ email: data.email }).select("+passwordHash");
      if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
        return { err: "Incorrect email or password" };
      }

      const token = this.generateToken(user._id.toString());
      const { passwordHash, ...userObj } = user.toObject();

      return {
        item: { user: userObj, token },
        message: "User logged in successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to login" };
    }
  }

  async changePassword(userId: string, data: any) {
    try {
      const user = await User.findById(userId).select("+passwordHash");
      if (!user) return { err: "User not found" };

      const isMatch = await bcrypt.compare(data.oldPassword, user.passwordHash);
      if (!isMatch) return { err: "Incorrect old password" };

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(data.newPassword, salt);

      await User.findByIdAndUpdate(userId, { passwordHash }, { new: true });

      return {
        item: {},
        message: "Password changed successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to change password" };
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await User.findOne({ email });
      if (!user) return { err: "User not found with this email" };

      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      await User.findByIdAndUpdate(user._id.toString(), {
        resetPasswordToken,
        resetPasswordExpires,
      }, { new: true });

      // In a real app, send email here
      return {
        item: { resetToken },
        message: "Password reset token generated",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to generate password reset token" };
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: new Date() },
      });

      if (!user) return { err: "Token is invalid or has expired" };

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(user._id.toString(), {
        passwordHash,
        $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 },
      }, { new: true });

      return {
        item: {},
        message: "Password reset successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to reset password" };
    }
  }

  async updateProfile(userId: string, data: any) {
    try {
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      if (!user) return { err: "User not found" };

      const { passwordHash, ...userObj } = user.toObject();

      return {
        item: { user: userObj },
        message: "Profile updated successfully",
      };
    } catch (error: any) {
      return { err: error.message || "Failed to update profile" };
    }
  }
}

export default new AuthService();
