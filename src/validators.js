const queryString = require('query-string')

const isAuthorized = request => {
  const body = queryString.parse(request.body)

  if (body.token === process.env.SLACK_TOKEN) {
    return true
  }

  return false
}

module.exports = isAuthorized
