// const { routes } = require('./config/server');
const app = require('./config/server');
const routes = require('./app/routes/routes');


routes.home(app);
routes.salvarAtivo(app);
routes.atualizarAtivo(app);
routes.listarObra(app);

routes.registrarAtivo(app);
routes.atualizarAtivo(app);
routes.pesquisarAtivo(app);
routes.removerAtivo(app);

routes.registrarTransferencia(app);
routes.atualizarTransferencia(app);
routes.pesquisarTransferencia(app);
routes.removerTransferencia(app);