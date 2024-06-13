import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://pyegateway.onrender.com/graphql',
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
