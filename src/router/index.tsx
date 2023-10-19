import App from "../App";
import Intro from "../pages/intro";
import NewAccount from "../pages/new-account";
import Home from "../pages/home";
import DeployAccount from "../pages/deploy-account";
import TransferAsset from "../pages/transfer-asset";

import {createBrowserRouter} from 'react-router-dom';
import Test from "../pages/test";

const routerMap = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "onboarding/intro",
        element: <Intro/>
    },
    {
        path: "accounts/new",
        element: <NewAccount/>
    },
    {
        path: "home",
        element: <Home/>
    },
    {
        path: "deploy-account",
        element: <DeployAccount/>
    },
    {
        path:"transfer-assets",
        element: <TransferAsset/>
    },
    {
        path: 'test',
        element: <Test/>
    }
]

const router = createBrowserRouter(routerMap);


export default router;
