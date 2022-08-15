const express = require('express')
var cors = require('cors')
var app = express()
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

app.get('/getgasprice', (req, res, next) => {
  const { search } = req.query
  if (!search)
    return res.status(404).send({ error: 'query param "search" is missing' })

  var data = JSON.stringify({
    operationName: 'LocationBySearchTerm',
    variables: {
      fuel: 1,
      maxAge: 0,
      search: search,
    },
    query:
      'query LocationBySearchTerm($brandId: Int, $cursor: String, $fuel: Int, $lat: Float, $lng: Float, $maxAge: Int, $search: String) {\n  locationBySearchTerm(lat: $lat, lng: $lng, search: $search) {\n    countryCode\n    displayName\n    latitude\n    longitude\n    regionCode\n    stations(brandId: $brandId, cursor: $cursor, fuel: $fuel, maxAge: $maxAge) {\n      count\n      cursor {\n        next\n        __typename\n      }\n      results {\n        address {\n          country\n          line1\n          line2\n          locality\n          postalCode\n          region\n          __typename\n        }\n        badges {\n          badgeId\n          callToAction\n          campaignId\n          clickTrackingUrl\n          description\n          detailsImageUrl\n          detailsImpressionTrackingUrls\n          imageUrl\n          impressionTrackingUrls\n          targetUrl\n          title\n          __typename\n        }\n        brandings {\n          brand_id\n          branding_type\n          __typename\n        }\n        brands {\n          brand_id\n          image_url\n          name\n          __typename\n        }\n        emergency_status {\n          has_diesel {\n            nick_name\n            report_status\n            update_date\n            __typename\n          }\n          has_gas {\n            nick_name\n            report_status\n            update_date\n            __typename\n          }\n          has_power {\n            nick_name\n            report_status\n            update_date\n            __typename\n          }\n          __typename\n        }\n        enterprise\n        fuels\n        id\n        name\n        offers {\n          discounts {\n            grades\n            pwgb_discount\n            __typename\n          }\n          types\n          __typename\n        }\n        pay_status {\n          is_pay_available\n          __typename\n        }\n        prices {\n          cash {\n            nickname\n            posted_time\n            price\n            __typename\n          }\n          credit {\n            nickname\n            posted_time\n            price\n            __typename\n          }\n          discount\n          fuel_product\n          __typename\n        }\n        ratings_count\n        star_rating\n        __typename\n      }\n      __typename\n    }\n    trends {\n      areaName\n      country\n      today\n      todayLow\n      trend\n      __typename\n    }\n    __typename\n  }\n}\n',
  })

  var config = {
    method: 'post',
    url: 'https://www.gasbuddy.com/graphql',
    headers: {
      authority: 'www.gasbuddy.com',
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7,la;q=0.6',
      'content-type': 'application/json',
    },
    data: data,
  }

  axios(config)
    .then(function (response) {
      let priceResults =
        response.data.data.locationBySearchTerm.stations.results
          .map((item) => {
            return item.prices.filter((item) => item.credit.price > 0)[0]
          })
          .filter((item) => item !== undefined)

      const sumTotal = priceResults.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.credit.price
      }, 0)
      const locationAverage = parseFloat(
        (sumTotal / priceResults.length).toFixed(2)
      )

      const locationAverageDisplay = (
        Math.round(locationAverage * Math.pow(10, 2)) / Math.pow(10, 2)
      ).toFixed(2)

      return res.status(200).send({
        locationAverage,
        locationAverageDisplay,
        location: response.data.data.locationBySearchTerm.displayName,
      })
    })
    .catch(function (error) {
      return res.send(error)
    })
})

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})
