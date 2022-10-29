import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// load mock apis
import '_mockApis';

// project imports
import App from 'App';
import { BASE_PATH } from 'config';
import { store, persister } from 'store';
import * as serviceWorker from 'serviceWorker';
import reportWebVitals from 'reportWebVitals';
import { ConfigProvider } from 'contexts/ConfigContext';
import { ApolloProvider, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
// style + assets
import 'assets/scss/style.scss';


// ==============================|| REACT DOM RENDER  ||============================== //

 const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:5000/graphql'
      }),
    cache: new InMemoryCache()
});
ReactDOM.render(
    <Provider store={store}>
   <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persister}>
       
            <ConfigProvider>
                <BrowserRouter basename={BASE_PATH}>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
            
        </PersistGate>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
