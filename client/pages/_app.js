import '../styles/globals.css'
import { Provider } from 'react-redux'
import store, {persistor} from '../src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import {io} from 'socket.io-client'
import {createContext} from 'react'

const production = 'https://guess-that-task-server.herokuapp.com';
const development = 'http://localhost:4000'
const url = process.env.NODE_ENV === 'development' ? development : production;
export const SocketContext = createContext();

const socket = io(url, { transports: ['websocket'] });

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketContext.Provider  value={socket}> 
            <Component {...pageProps} />
          </SocketContext.Provider>
        </PersistGate>
    </Provider>
  )
}

export default MyApp
