const express = require('express')
var cors = require('cors')
var app = express()
var proxy = require('express-http-proxy')
var axios = require('axios')

app.use(cors())

app.get('/', (req, res, next) => {
  return res.send({ message: 'proxy server running' })
})

// app.use(
//   '/getmakes',
//   proxy('https://www.gasbuddy.com/tripcostcalculator/getmakes')
// )

app.get('/getmakes', (req, res, next) => {
  var config = {
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

app.listen(8000, function () {
  console.log('CORS-enabled web server listening on port 80')
})
