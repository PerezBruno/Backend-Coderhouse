import { __dirname } from "../path.js"

export const swaggerOpts = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentation with swagger OPEN API Standard",
      description: "How to use endpoints and their parameters",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
