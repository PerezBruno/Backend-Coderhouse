// TODO: configura la app para que se puedan realizar peticiones desde otro servidor
// desde otra 

import { ORIGIN } from "./config.js";

const corsConfig = {
    allowedHeaders: `${ORIGIN}`,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    origin: ORIGIN
}

export default corsConfig;