import Spinner from '@components/Spinner';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import Layout from './pages/Layout';

ReactDOM.render(
  <Suspense fallback={<Spinner fullScreen />}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Layout />
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
