const { startServer }  = require ("./server/js/start-server.js")
const { handleServer } =  require ("./server/js/handlers/server-hendler.js")

startServer().then(handleServer)