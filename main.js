const _fetch = require('node-fetch').default;
const { rest } = require('msw');
const { setupServer } = require('msw/node');

global.fetch = _fetch;

const server = setupServer(
  rest.get('https://api.backend.dev/ok', (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  rest.get('https://api.backend.dev/not_found', (req, res, ctx) => {
    return res(ctx.status(404));
  }),

  rest.get('https://api.backend.dev/forbidden', (req, res, ctx) => {
    return res(ctx.status(403))
  }),

  rest.get('https://api.backend.dev/:slug', (req, res, ctx) => {
    return res(ctx.json({ slug: 'John' }))
  }),
)

server.listen();

async function main() {
  const res1 = await fetch('https://api.backend.dev/ok');
  const res2 = await fetch('https://api.backend.dev/not_found');
  const res3 = await fetch('https://api.backend.dev/forbidden');
  const res4 = await fetch('https://api.backend.dev/blah');
  console.log(res1.status)
  console.log(res2.status)
  console.log(res3.status)
  console.log(await res4.json())
}

main();
