import Spinner from '@components/Spinner';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import Layout from './Layout';
import './index.scss';

ReactDOM.render(
  <Suspense fallback={<Spinner fullScreen />}>
    <HashRouter>
      <Layout />
    </HashRouter>
  </Suspense>,
  document.getElementById('root')
);
