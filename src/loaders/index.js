import middlewareLoader from "./middlewareLoader.js";
import routesLoader from "./routesLoader.js";

const loaders = async (app) => {
middlewareLoader(app);
routesLoader(app);
};

export default loaders;