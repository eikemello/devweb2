// const { routes } = require('./config/server');
const app = require('./config/server');
const routes = require('./app/routes/routes');


routes.homeRoute(app);
routes.loginRoute(app);
routes.loginCriaUsuarioRoute(app);
routes.loginValidarRoute(app);
routes.logoutRoute(app);

routes.registrarAtivoRoute(app);
routes.salvarAtivoRoute(app);
routes.atualizarAtivoRoute(app);
routes.salvarAtualizaçãoAtivoRoute(app);
routes.pesquisarAtivoRoute(app);
routes.removerAtivoRouteGET(app);
routes.removerAtivoRoutePOST(app);

routes.registrarTransferenciaRoute(app);
routes.atualizarTransferenciaRoute(app);
routes.pesquisarTransferenciaRoute(app);
routes.removerTransferenciaRoute(app);