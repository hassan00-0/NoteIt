import ratelimit from "../config/ratelimit.js";
const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip;
    const { success } = await ratelimit.limit(identifier);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests try again later" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "internal server error( ratelimiting)" });
  }
};
export default rateLimiter;
