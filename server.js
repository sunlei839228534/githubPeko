const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then(()=>{
  const server = new Koa()
  const router = new Router()

  router.get('/a/:id', async (ctx)=>{ 
    const id = ctx.params.id
    console.log(ctx)
    await handle(ctx.req,ctx.res, {
      pathname: '/a',
      query: { id }
    })
  })


  server.use(router.routes(),router.allowedMethods())

  server.use(async (ctx,next) => {
    await handle(ctx.req,ctx.res)
    ctx.respond = false
  })

  server.listen(3000,() => {
    console.log('koa server listeing on 3000')
  })
})