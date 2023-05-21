module.exports = { serveFile }
const { typeDictionary } = require('./helpers/mime-types.js')


const { createReadStream } = require('fs')

async function serveFile(request, response) {
  const path = "public/" + (request.url.slice(1) || "index.html")
  const extension = path.match(/\.([^.\/\\]+)$/)?.[1]
  const type = typeDictionary[extension]
  if (type) response.setHeader('Content-Type', type)

  createReadStream(path).pipe(response)
}