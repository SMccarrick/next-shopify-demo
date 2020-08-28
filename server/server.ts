import "isomorphic-fetch";
const dotenv = require("dotenv");
const Koa = require("koa");
const next = require("next");
const { default: createShopifyAuth, verifyRequest } = require("@shopify/koa-shopify-auth");
const session = require("koa-session");

dotenv.config();

const port = parseInt(process.env.PORT as string, 10) || 8081;
const dev = process.env.NODE_ENV !== "producåtion";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY, SCOPES } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  server.use(
    session(
      {
        sameSite: "none",
        secure: true,
      },
      server
    )
  );
  server.keys = [SHOPIFY_API_SECRET];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: [SCOPES],
      async afterAuth(ctx: any) {
        // Auth token and shop available in session
        // Redirect to shop upon auth
        const { shop, accessToken } = ctx.session; // Fix interface
        console.log({ shop });
        console.log({ accessToken });

        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
        });

        ctx.redirect("/");
      },
    })
  );

  server.use(verifyRequest());

  server.use(async (ctx: any) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return;
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
