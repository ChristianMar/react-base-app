import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppLayout from '@main/layouts/AppLayout';
import { store } from './config';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
