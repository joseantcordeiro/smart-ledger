import React from 'react'
import Layout from "../components/layout"
// import styles from '../styles/Home.module.css'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import supertokensNode from 'supertokens-node'
import { backendConfig } from '../config/backendConfig'
import Session from 'supertokens-node/recipe/session'
import {
  SessionAuth,
  useSessionContext,
} from 'supertokens-auth-react/recipe/session'
import { redirectToAuth } from 'supertokens-auth-react'

export async function getServerSideProps(context) {
  // this runs on the backend, so we must call init on supertokens-node SDK
  supertokensNode.init(backendConfig())
  let session
  try {
    session = await Session.getSession(context.req, context.res)
  } catch (err) {
    if (err.type === Session.Error.TRY_REFRESH_TOKEN) {
      return { props: { fromSupertokens: 'needs-refresh' } }
    } else if (
      err.type === Session.Error.UNAUTHORISED ||
      err.type === Session.Error.INVALID_CLAIMS
    ) {
      return { props: {} }
    } else {
      throw err
    }
  }

  return {
    props: { userId: session.getUserId() },
  }
}

function ProtectedPage({ userId }) {
  const session = useSessionContext()

  async function fetchUserData() {
    const res = await fetch('/api/user')
    if (res.status === 200) {
      const json = await res.json()
      alert(JSON.stringify(json))
    }
  }

  if (session.loading === true) {
    return null
  }

  return (
		<section className="section">
      <div className="container">
        <h1 className="title">
          Hello World from <a href="https://nextjs.org/">Next.js</a> and{" "}
          <a href="https://bulma.io/">Bulma</a>!
        </h1>
				<p>
          UserId: {session.userId} <br /> (from SSR: {userId})
        </p>
        <p>
          Access token payload: {JSON.stringify(session.accessTokenPayload)}
        </p>
				
				<div
          style={{
            display: 'flex',
            height: '70px',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingLeft: '75px',
            paddingRight: '75px',
          }}
        >
          <div
            onClick={fetchUserData}
            style={{
              display: 'flex',
              width: '150px',
              height: '42px',
              backgroundColor: 'rgb(247 54 54)',
              borderRadius: '10px',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            FETCH USER API
          </div>
        </div>
      </div>
    </section>

  )
}

export default function Home(props) {
  return (
    <SessionAuth>
			<Layout home>
      	<ProtectedPage userId={props.userId} />
			</Layout>
    </SessionAuth>
  )
}
