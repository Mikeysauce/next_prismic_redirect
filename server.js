const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const results = require('./results');

app.prepare()
  .then(() => {

    const server = express()

    server.get('/a', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    server.get('/b', (req, res) => {
      return app.render(req, res, '/a', req.query)
    })
    server.get('/:redirect', (req, res) => {
      console.log(req.originalUrl)
      const urls = results.map(item => item.uid);
      const target = results[0].data.redirect.destination.value.document.slug;
      if (urls.includes(req.originalUrl.replace('/', ''))) {
        return res.redirect(301, `/${target}`)
      }
      return handle(req, res);
    })
    server.get('/posts/:id', (req, res) => {
      return app.render(req, res, '/posts', { id: req.params.id })
    })
    server.use(function (err, req, res, next) {
      console.error(err.stack)
      res.status(500).send('Something broke!')
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })


    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
