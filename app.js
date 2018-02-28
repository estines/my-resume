const koa = require('koa')
const fs = require('fs')
const path = require('path')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const port = process.env.PORT || 3000

const app = new koa()
const router = new Router()
    .get('/api', async ctx => {
        ctx.body = `Hello API555`
    })
    //! set route before generator function!!
    .get('*', function* () {
        this.body = fs.readFileSync(path.resolve(path.join('build', 'index.html')), 'utf-8')
    })

app.use(static(path.resolve(__dirname, 'build')))
app.use(bodyparser())
app.use(router.routes())
app.listen(port, () => {
    console.log(`This application is running on port ${port}`)
})