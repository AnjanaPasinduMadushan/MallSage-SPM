import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store.jsx';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
