import { generateQRCode } from "../utils/qrGenerator.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role, aadhaar, trip, emergency } = req.body;

    // ✅ Save user
    let user = await User.create({
      fullName, email, password: hashedPassword, mobile, role, aadhaar, trip, emergency
    });

    // ✅ Generate QR code with essential details
    const qrData = { fullName, email, mobile, aadhaar, trip, emergency };
    const qrCode = await generateQRCode(qrData);

    return res.status(201).json({ user, qrCode });
  } catch (error) {
    return res.status(500).json({ message: "Signup error", error });
  }
};
