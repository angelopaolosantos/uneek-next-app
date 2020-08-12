// import App from 'next/app'
import '../styles/custom-theme.less'
import ApolloProvider from '../contexts/apollo/ApolloProvider'
import { Auth0Provider } from '@auth0/auth0-react'

function MyApp({ Component, pageProps }) {
  return (
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_DOMAIN}
          clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
          redirectUri="http://localhost:3000/"
        >
        <ApolloProvider>
        <Component {...pageProps} />
        </ApolloProvider>
        </Auth0Provider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp