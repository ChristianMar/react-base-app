import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from '@main/layouts/AppLayout';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
