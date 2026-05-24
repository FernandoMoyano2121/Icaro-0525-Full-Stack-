export const mockAuth = (req, res, next) => {
  req.user = {
    username: "admin",
    role: "user",
  };
  next();
};
