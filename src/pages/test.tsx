import {Button, Container, Typography} from '@mui/material';
import { useApiContext } from '../background/hooks/keyring-hooks';
import { powerUp } from '../background/redux-slices/test';
import { createNewAccount } from '../background/redux-slices/keyrings';
import { useDispatch } from 'react-redux';
import MainServiceManager from '../background/services/main';

/**
 * In this page, I test that the slice function is ok.
 * @returns 
 */


export default function Test(){
    const apiContext = useApiContext();
    
    return (
        <Container sx={{
            border: '1px solid red',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
        >
            <Typography variant='h3' sx={{
                backgroundColor: 'red',
                textAlign:'center'
            }}>你好</Typography>
             <Button variant='contained' onClick={async (e)=>{
                await createNewAccount({name:"aaa",implementation:'active',chainIds:["1"]}
                ,apiContext);
                }}>Click</Button>
        </Container>
       
    )


}