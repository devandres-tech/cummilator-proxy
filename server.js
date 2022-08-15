const express = require('express')
var cors = require('cors')
var app = express()
var proxy = require('express-http-proxy')
var axios = require('axios')

app.use(cors())

const PORT = process.env.PORT || 8080

app.get('/', (req, res, next) => {
  return res.send({ message: 'proxy server running' })
})

app.get('/getmakes', (req, res, next) => {
  const config = {
    method: 'get',
    url: 'https://www.gasbuddy.com/tripcostcalculator/getmakes',
    headers: {
      Authorization: 'Bearer',
      Cookie:
        'datadome=i~Ini44wxx~ISKoHrNrYi9w_wYE9wdvFu.wlP9mAoTwV9tsr_VWqDFcEOFkZ.cI1yDBX5rdd07Cwe2n4jQ9.taeymdg_sqGyBvLgX4~0cTxgaVa_Kz2dF8wXevBuN5Q; ASP.NET_SessionId=1icrwangnfi0hx0rlfl5vz14',
    },
  }

  axios(config)
    .then(function (response) {
      return res.send(response.data)
    })
    .catch(function (error) {
      return res.send(error)
    })
})

app.get('/getvehiclemodels', (req, res, next) => {
  const { year, makeid } = req.query
  if (!year && !makeid) {
    return res.status(404).send({
      message: 'Error, you need to provide year and makeid query params',
    })
  }

  const config = {
    method: 'get',
    url: `https://www.gasbuddy.com/tripcostcalculator/getvehiclemodels?year=${year}&makeid=${makeid}`,
    headers: {
      authority: 'www.gasbuddy.com',
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7,la;q=0.6',
      'cache-control': 'max-age=0',
    },
  }

  axios(config)
    .then(function (response) {
      return res.status(200).send(response.data)
    })
    .catch(function (error) {
      return res.send(error)
    })
})

app.get('/getvehiclespec', (req, res, next) => {
  const { trimid, year } = req.query
  if (!year && trimid) {
    return res.status(404).send({
      message: 'Error, you need to provide year and trimid query params',
    })
  }

  const config = {
    method: 'get',
    url: `https://www.gasbuddy.com/tripcostcalculator/getvehiclespec?trimid=${trimid}&year=${year}`,
    headers: {
      authority: 'www.gasbuddy.com',
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7,la;q=0.6',
      'cache-control': 'max-age=0',
    },
  }

  axios(config)
    .then(function (response) {
      return res.status(200).send(response.data)
    })
    .catch(function (error) {
      return res.send(error)
    })
})

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})
