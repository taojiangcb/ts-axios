


// const bodyParser = require('koa-bodyparser');
// const Router = require('koa-router');
// const Koa = require('koa');

import Koa = require('koa');
import Router = require('koa-router');
import bodyParser = require('koa-bodyparser');

const app = new Koa();
let router = new Router();

router.get('/api/hello', async (ctx: Router.RouterContext) => {
  ctx.body = "123";
});

router.get('/api/base/get', function (ctx: Router.RouterContext) {
  ctx.body = ctx.request.body;
})

router.post('/base/post', function (ctx: Router.RouterContext) {
  ctx.body = ctx.request.body;
})

router.post('/base/buffer', function (ctx: Router.RouterContext) {
  let msg: any[] = []
  ctx.req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  ctx.req.on('end', () => {
    let buf = Buffer.concat(msg)
    ctx.body = buf.toJSON();
  })
})


app.use(bodyParser());
app.use(router.routes());
app.listen(3030, () => {
  console.log('server is startd...');
})