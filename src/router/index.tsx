import App from "../App";
import Intro from "../pages/intro";
import NewAccount from "../pages/new-account";
import Home from "../pages/home";
import DeployAccount from "../pages/deploy-account";
import TransferAsset from "../pages/transfer-asset";

import {createBrowserRouter} from 'react-router-dom';

const routerMap = [
    {
        path: "/",
        element: <App/>
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
        path:"transfer-asset",
        element: <TransferAsset/>
    }
]

const router = createBrowserRouter(routerMap);


export default router;
