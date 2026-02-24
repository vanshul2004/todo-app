export const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("jwt middleware token", token);
  next();
};
