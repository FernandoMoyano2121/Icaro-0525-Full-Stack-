import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API con Auth",
      version: "1.0.0",
      description: "Swagger + Winston + Morgan + JWT integrados",
    },
    servers: [{ url: "http://localhost:3003" }],
    components: {
      securitySchemes: {
        // BearerAuth: esquema HTTP de tipo Bearer (JWT).
        // En la UI de Swagger aparecerá el botón "Authorize"
        // donde el usuario puede pegar su token.
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // Si quisiéramos proteger TODOS los endpoints globalmente:
    // security: [{ BearerAuth: [] }]
  },
  apis: ["./ejemplo-04-integracion-completa/index.js"],
});

export default swaggerSpec;
