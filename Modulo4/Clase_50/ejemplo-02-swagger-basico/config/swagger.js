import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Api de ejemplo",
      version: "1.0.0",
      description: "Documentacion generada por swaggerJSDoc",
    },
  },
  servers: [{ url: "http://localhost:3001" }],
  apis: ["./ejemplo-02-swagger-basico/index.js"],
});
