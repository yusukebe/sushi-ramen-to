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
        <br />
        But I like <span class='large'>🍣</span> and <span class='large'>🍜</span>!!
      </p>
      <p>
        <small>
          <a href='https://github.com/yusukebe/sushi-ramen-to'>go to GitHub</a>
        </small>
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
