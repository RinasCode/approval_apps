const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async register(req, res, next) {
    try {
      const {
        nameString,
        emailString,
        passwordString,
        levelNumber,
        departmentIDString,
        roleString,
      } = req.body;

      const existingUserByEmail = await User.findOne({
        where: { emailString },
      });
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already in use." });
      }
      let idString;
      let userCount = await User.count();
      let exists = true;

      while (exists) {
        idString = `user${userCount + 1}`;
        exists = await User.findOne({ where: { idString } });
        userCount++;
      }

      const hashedPassword = await bcrypt.hash(passwordString, 10);
      console.log("Hashed Password on Registration:", hashedPassword);

      const newUser = await User.create({
        idString,
        nameString,
        emailString,
        passwordString: hashedPassword,
        levelNumber,
        departmentIDString,
        roleString,
      });

      res
        .status(201)
        .json({ message: "User registered successfully", data: newUser });
    } catch (error) {
      console.error("Registration Error:", error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { emailString, passwordString } = req.body;
      const user = await User.findOne({ where: { emailString } });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = bcrypt.compareSync(
        passwordString,
        user.passwordString
      );
      console.log("Password valid:", isPasswordValid);
      console.log("Input password:", passwordString);
      console.log("Hashed password in DB:", user.passwordString);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { idString: user.idString, roleString: user.roleString },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      console.log("JWT_SECRET value:", process.env.JWT_SECRET);

      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          idString: user.idString,
          roleString: user.roleString,
          levelNumber: user.levelNumber,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { idString: id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const {
        nameString,
        emailString,
        levelNumber,
        departmentIDString,
        roleString,
      } = req.body;

      const user = await User.findOne({ where: { idString: id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.nameString = nameString || user.nameString;
      user.emailString = emailString || user.emailString;
      user.levelNumber = levelNumber || user.levelNumber;
      user.departmentIDString = departmentIDString || user.departmentIDString;
      user.roleString = roleString || user.roleString;

      await user.save();

      res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    } catch (error) {
      console.error("Error updating user:", error);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { idString: id } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();
      res.status(204).send(); 
    } catch (error) {
      console.error("Error deleting user:", error);
      next(error);
    }
  }
}

module.exports = UserController;
