
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {RouterProvider} from 'react-router-dom';
import router from './router';

import startMain from './background/main';
import {Buffer} from 'buffer';
import { Provider } from 'react-redux';
import MainServiceManager from './background/services/main';


async function start(){
  const mainServiceManager:MainServiceManager = await startMain();
  console.log(mainServiceManager.store)
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    //必须包起来才能进行状态管理
    <Provider store={mainServiceManager.store}>
      <RouterProvider router={router}/>
    </Provider>
  );
}

start();
