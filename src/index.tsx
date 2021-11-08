import Spinner from '@components/Spinner';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import Layout from './pages/Layout';

ReactDOM.render(
  <Suspense fallback={<Spinner fullScreen />}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
