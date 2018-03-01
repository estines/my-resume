const koa = require('koa')
const fs = require('fs')
const path = require('path')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const port = process.env.PORT || 3000

if (cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

} else {

    const app = new koa()
    const router = new Router()
        .get('/api', async ctx => {
            ctx.body = [
                { test: 123456 },
                { test: 5555 },
                { test: 5555 },
                { test: 5555 },
                { test: 5555 },
                { test: 5555 },
                { test: 5555 }
            ]
        })
        //! set route before generator function!!
        .get('*', function* () {
            this.body = fs.readFileSync(path.resolve(path.join('build', 'index.html')), 'utf-8')
        })

    app.use(static(path.resolve(__dirname, 'build', 'index.html')))
    app.use(bodyparser())
    app.use(router.routes())
    app.listen(port, () => {
        console.log(`This application is running on port ${port}`)
    })
}