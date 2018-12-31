const axios = require('axios')
const formatMessage = require('./src/slackFormatter')
const isAuthorized = require('./src/validators')

const { WAKA_TOKEN, LEADERBOARD_ID } = process.env
const BASE_URL = 'https://wakatime.com/api/v1'

const createSuccess = body => ({
  statusCode: 200,
  body: JSON.stringify(body)
})

const createFailure = body => ({
  statusCode: 400,
  body
})

exports.handler = async event => {
  if (!isAuthorized(event)) {
    return createFailure('')
  }

  const path = `/users/current/leaderboards/${LEADERBOARD_ID}`
  const token = Buffer.from(WAKA_TOKEN).toString('base64')
  const method = 'get'
  const url = BASE_URL + path
  const headers = { 'Authorization': `Basic ${token}` }

  /* 
  ** WakaTime's API returns a really ugly JSON object
  ** The data we care about is nested like 3 levels deep
  ** Not to mention, there are two keys named `data` (hence,
  ** the reassignment of data to outerData)
  */
  return axios({
    method,
    url,
    headers
  })
  .then(({ data: outerData }) => formatMessage(outerData))
  .then(createSuccess)
  .catch(({ response }) => createFailure(response.data.error))
}
