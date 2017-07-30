import React from "react";
import { renderToString } from "react-dom/server";
import App from "../share/containers/App";

const Koa = require('koa');

// 使用router
const Router = require('koa-router');
const Boom = require('boom');
const app = new Koa();
const router = new Router();
app.use(router.routes());
app.use(router.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
}));

// 使用bodyparser 解析get,post的参数
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// 使用static 实现了静态资源服务
const path = require('path');
const serve = require('koa-static');
const staticPath = './public'; // 静态资源目录对于相对入口文件server.js的路径
app.use(
    serve(
        staticPath
    )
);

router.get('/', async (ctx, next) => {
    ctx.body = `
    <!DOCTYPE html>
      <head>
        <title>Universal Reacl</title>
        <link rel="stylesheet" href="css/main.css">
        <script src="browser.js" defer></script>
      </head>

      <body>
        <div id="root">${renderToString(<App />)}</div>
      </body>
    </html>
    `;
});

// log error
app.on('error', (err, ctx) => {
    console.log('server error', err, ctx);
}
);

app.listen(9999);
