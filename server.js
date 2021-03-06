const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')
const atob = require('atob')

const api = require('./server/api')
const auth = require('./server/auth')

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })

const handle = app.getRequestHandler()

//创建redis client
const redis = new Redis()

//设置nodejs全局增加一个atob方法

global.atob = atob

app.prepare().then(()=>{
  const server = new Koa()
  const router = new Router()

  server.keys = ["peko"]

  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis)
  }

  server.use(koaBody())
  server.use(session(SESSION_CONFIG,server))

  //配置处理github Oauth登录
  auth(server)
  api(server)

  router.get('/api/user/info',async ctx=>{
    const user = ctx.session.userInfo
    if(!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    }else {
      ctx.body = ctx.session.userInfo
      ctx.set('Content-Type','application/json')
    }
  })
  router.get('/a/:id', async (ctx)=>{ 
    const id = ctx.params.id
    await handle(ctx.req,ctx.res, {
      pathname: '/a',
      query: { id }
    })
    ctx.respond = false
  })


  server.use(router.routes(),router.allowedMethods())

  server.use(async (ctx,next) => {
    // ctx.cookies.set('id', "userid:pekosama")
    ctx.req.session = ctx.session
    await handle(ctx.req,ctx.res)
    ctx.respond = false
  })

  server.listen(3000,() => {
    console.log('koa server listeing on 3000')
  })
})