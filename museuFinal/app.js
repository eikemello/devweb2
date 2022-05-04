// const { routes } = require('./config/server');
const app = require('./config/server');
const routes = require('./app/routes/routes');


routes.homeRoute(app);

routes.registrarAtivoRoute(app);
routes.salvarAtivoRoute(app);
routes.atualizarAtivoRoute(app);
routes.pesquisarAtivoRoute(app);
routes.removerAtivoRoute(app);

routes.registrarTransferenciaRoute(app);
routes.atualizarTransferenciaRoute(app);
routes.pesquisarTransferenciaRoute(app);
routes.removerTransferenciaRoute(app);