import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from "./state/store";
import {ThemeProvider} from './contexts/ThemeProvider'
import App from "./App";
import {Layout} from './layout';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <Layout>
                <App/>
            </Layout>
        </ThemeProvider>
    </Provider>
    ,
    document.getElementById('root'),
);


