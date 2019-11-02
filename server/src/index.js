import './auth';
import './database';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import passport from 'koa-passport';
import session from 'koa-session';

import send from 'koa-send';

import { port, sessionKey } from './config';
import indexRoute from './routes';

const app = new Koa();
app.keys = [sessionKey];

app.use(session(app));

app.use(bodyParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(koaStatic('dist'));

app.use(indexRoute.routes()).use(indexRoute.allowedMethods());

app.use(async ctx => {
  await send(ctx, 'dist/index.html');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
