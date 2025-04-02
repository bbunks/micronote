import { Application, Router } from "jsr:@oak/oak";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Hello world";
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen();
