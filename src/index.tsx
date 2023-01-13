import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono()

const Layout = (props: any) => html`<html>
  <head>
    <title>🍣🍜.to</title>
    <style>
      a {
        text-decoration: none;
        color: #2b3a55;
      }
      header {
        border-bottom: 1px solid #eee;
        width: 300px;
        margin: 2rem auto 1rem;
        padding: 0 0 0.5rem;
        text-align: center;
      }
      p {
        text-align: center;
      }
      .large {
        font-size: 1.4rem;
      }
      .x-large {
        font-size: 1.8rem;
      }
    </style>
  </head>
  <body>
    <header>
      <small>
        <p><a href="/">Which you like?</a></p>
      </small>
    </header>
    ${props.children}
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
        You like <span class='large'>{sushiOrRamen}</span>
      </p>
      <p>
        <a href='https://github.com/yusukebe'>
          But I like <span class='large'>🍣</span> and <span class='large'>🍜</span>!
        </a>
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
