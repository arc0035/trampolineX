import {Container, Typography} from '@mui/material';

export default function Test(){

    return (
        <Container sx={{
            border: '1px solid red'
        }}
        >
            <Typography variant='h3' sx={{
                backgroundColor: 'red',
                textAlign:'center'
            }}>你好</Typography>
        </Container>
    )


}