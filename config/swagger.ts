import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Gym / Fitness Class Booking API",
      version: "1.0.0",
      description: "Gym booking system API",
    },

    servers: [
      {
        url: "https://backend-project-production-8cde.up.railway.app",
        description: "Production Server (Railway)",
      },
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
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
  },

  apis: ["./routes/*.ts"],
};

export const specs = swaggerJsdoc(options);
   