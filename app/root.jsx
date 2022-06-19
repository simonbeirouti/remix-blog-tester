import { Link, LiveReload, Outlet, Links, Meta, useLoaderData } from "@remix-run/react";
import globalStylesUrl from "~/styles/globals.css";
import { getUser } from '~/utils/session.server'

export const links = () => [{rel: 'stylesheet', href: globalStylesUrl}]

export const meta = () => {
  const description = 'A blog built with Remix'
  const keywords = 'remix, javascript, react'

  return (
    description,
    keywords
  )
}

export const loader = async ({ request }) => {
  const user = await getUser(request)
  const data = {
    user
  }
  return data
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({children, title}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{ title ? title : "Remix blog!"}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>)
}

function Layout({children}) {
  const { user } = useLoaderData()

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          {user ? (
            <li>
              <form action="/auth/logout" method="POST">
                <button className="btn" type="submit">Logout { user.username }</button>
              </form>
            </li>
          ) : (<li>
            <Link to="/auth/login">Login</Link>
          </li>)}
          
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  )
}

export function ErrorBoundary({error}) {
  console.log(error)
  return (
      <Document>
        <Layout>
          <h1>Error</h1>
          <p>{error.message}</p>
        </Layout>
      </Document>
  )
}