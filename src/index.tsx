import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

const Layout = (props: any) => html`<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🍣🍜.to</title>
    <style>
      body {
        font-size: 1.4rem;
      }
      a {
        text-decoration: none;
        color: #2b3a55;
      }
      header {
        border-bottom: 1px solid #eee;
        width: 200px;
        margin: 2rem auto 1rem;
        padding: 0 0 0.5rem;
        text-align: center;
      }
      footer {
        border-top: 1px solid #eee;
        width: 200px;
        margin: 2rem auto 1rem;
        padding: 1rem 0 0.5rem;
        text-align: center;
        font-size: 12px;
      }
      p {
        text-align: center;
      }
      .large {
        font-size: 3.5rem;
      }
      .x-large {
        font-size: 5rem;
      }
    </style>
  </head>
  <body>
    <header>
      <small>
        <p><a href="/">Which do you like?</a></p>
      </small>
    </header>
    ${props.children}
    <footer>
      <a rel="me" href="https://github.com/yusukebe">GitHub</a>&nbsp;
      <a rel="me" href="https://twitter.com/yusukebe">Twitter</a>&nbsp;
      <a rel="me" href="https://mas.to/@yusukebe">Mastodon</a>
    </footer>
  </body>
</html>`

const Top = () => {
  return (
    <div>
      <p>
        <a class='x-large' href={`/${encodeURI('🍣')}`}>
          🍣
        </a>
        &nbsp; or &nbsp;
        <a class='x-large' href={`/${encodeURI('🍜')}`}>
          🍜
        </a>
      </p>
    </div>
  )
}

const Page = ({ sushiOrRamen }: { sushiOrRamen: string }) => {
  return (
    <div>
      <p>
        You like
        <a class='large' href={`/${encodeURI(sushiOrRamen)}`}>
          {sushiOrRamen}
        </a>
        <br />
        But I like
        <a class='large' href={`/${encodeURI('🍣')}`}>
          🍣
        </a>
        and
        <a class='large' href={`/${encodeURI('🍜')}`}>
          🍜
        </a>
        !!
      </p>
    </div>
  )
}

const NotFound = () => {
  return (
    <div>
      <p>🍣🍜 Not Found</p>
    </div>
  )
}

app.get('/', (c) =>
  c.html(
    <Layout>
      <Top />
    </Layout>
  )
)

app.get('/:sushiOrRamen', (c) => {
  const sushiOrRamen = c.req.param('sushiOrRamen')
  if (sushiOrRamen === '🍣' || sushiOrRamen === '🍜') {
    return c.html(
      <Layout>
        <Page sushiOrRamen={sushiOrRamen} />
      </Layout>
    )
  }
  return c.notFound()
})

app.notFound((c) => {
  return c.html(
    <Layout>
      <NotFound />
    </Layout>,
    404
  )
})

export default app
