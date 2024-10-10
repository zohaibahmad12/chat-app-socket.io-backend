export const authMiddleware = (req, res, next) => {
  console.log("middleware called");
  next();
};
