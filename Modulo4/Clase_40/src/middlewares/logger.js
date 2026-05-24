export const logger = (req, res, next) => {
  console.log(`Metodo de petición: ${req.method} - URL: ${req.url}`);
  next();
};
