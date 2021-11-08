import Spinner from '@components/Spinner';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.scss';
import Layout from './pages/Layout';

ReactDOM.render(
  <Suspense fallback={<Spinner fullScreen />}>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Layout />
    </HashRouter>
  </Suspense>,
  document.getElementById('root')
);
