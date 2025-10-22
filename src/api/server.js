import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonserver.defaults();

server.use(middlewares);
server.use(router);

export default server;