import swaggerJSDoc from "swagger-jsdoc";

const getServerUrl = () => {
  if (process.env.BASE_URL) return process.env.BASE_URL;
  if (process.env.RAILWAY_PUBLIC_DOMAIN)
    return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/api`;
  return `http://localhost:${process.env.PORT || 5000}/api`;
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tuk-Tuk Tracking API",
      version: "1.0.0",
      description: "API documentation for Tuk-Tuk Tracking System",
    },
    servers: [
      {
        url: getServerUrl(),
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // where docs are written
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;