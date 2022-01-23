import '../styles/globals.css'
// import {createContext} from 'react'
import { Provider } from 'react-redux'
import store, {persistor} from '../src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// import {io} from "socket.io-client"

// const production = 'https://guess-that-task-server.herokuapp.com';
// const development = 'http://localhost:4000'
// const url = process.env.NODE_ENV === 'development' ? development : production;

// const socket = io(url)
// export const SocketContext = createContext()

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <SocketContext.Provider value={socket}> */}
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      {/* </SocketContext.Provider> */}
    </Provider>
  )
}

export default MyApp
