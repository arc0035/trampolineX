
/**
 * 根据localstorage状态，跳转对应页面
 * @returns 
 */
import { getActiveAccount } from "../background/redux-slices/selectors/accountSelectors";
import AccountMain from "./account-main";
import { useSelector } from "react-redux"
import Intro from "./intro";

export default function Home(){

    //1. 获取当前address
    let activeAccount = useSelector(getActiveAccount);

    if (activeAccount === undefined) {
        return  <Intro/>
    } 
    return <AccountMain />
}