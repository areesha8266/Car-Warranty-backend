const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppDataSource } = require("../data-source");
const { User, UserRole } = require("../entities/User");

const userRepository = AppDataSource.getRepository(User);

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      email,
      password: hashedPassword,
      role: role || UserRole.CUSTOMER
    });

    await userRepository.save(user);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { register, login };
