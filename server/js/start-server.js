module.exports = {startServer}

const webSocketServer = require('websocket').server
const {createServer} = require('http')
const port = process.env.PORT || 1337

async function startServer() {
  return new Promise((resolve, reject) => {
      const server = createServer()

      server.listen(port, () => {
          console.log(`server started at http://localhost:${port}`)
          resolve(server)
      })
  })
}

