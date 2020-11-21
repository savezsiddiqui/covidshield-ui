import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import web3 from './web3';
import './index.css';
import registration from './contract';

import {
   Container,
   Row,
   Col,
   Button,
   Form,
   FormLabel,
   FormControl,
   FormGroup
} from 'react-bootstrap';

const registerUser = async (account) => {
   try {
      await registration.methods.newRegistration().send({
         from: account
      });
      console.log('account registered');
   }
   catch (err) {
      console.log('regsiterUser : ', err);
   }
}

const toggleHealth = async (account) => {
   try {
      await registration.methods.toggleMyHealth().send({
         from: account
      });
      console.log('health toggled');
   }
   catch (err) {
      console.log('toggleHealth : ', err);
   }
}

const App = () => {

   const [account, setAccount] = useState('');
   const [healthy, setHealthy] = useState(null);

   const viewHealth = async (account) => {
      try {
         const _healthy = await registration.methods.myHealthStatus().send({
            from: account
         });
         setHealthy(_healthy);
      }
      catch (err) {
         console.log('toggleHealth : ', err);
      }
   }

   useEffect(() => {
      const fetchAccount = async () => {
         try {
            const _account = (await web3.eth.getAccounts())[0];
            console.log('account', _account);
            setAccount(_account);
         }
         catch (err) {
            console.log('FetchData:', err);
         }
      }

      fetchAccount();
   }, []);

   if (account === '') {
      return (
         <Container style={{ minHeight: '100vh' }}>
            <h1 className='display-4'>Loading.....</h1>
         </Container>
      )
   }
   else {
      return (
         <Container style={{ minHeight: '100vh' }}>
            <Row>
               <Col xs={12}>
                  <h1 className='display-4'> CovidShield Mother****** </h1>
               </Col>

               <Col xs={12}>
                  <Form>
                     <FormGroup>
                        <FormLabel>Not Registered ?</FormLabel><br />
                        <Button onClick={() => registerUser(account)}>New Registration</Button>
                     </FormGroup>
                     <FormGroup>
                        <FormLabel>View your health status.</FormLabel><br />
                        <FormLabel>Current Status: {healthy === null ? 'unknown' : (healthy === true ? 'Safe' : 'At Risk')}</FormLabel><br />
                        <Button onClick={() => viewHealth(account)}>View Health</Button>
                     </FormGroup>
                     <FormGroup>
                        <FormLabel>Report if you're Covid positive.</FormLabel><br />
                        <Button onClick={() => toggleHealth(account)}>Toggle Health</Button>
                     </FormGroup>
                  </Form>
               </Col>
            </Row>
         </Container>
      )
   }
}

ReactDOM.render(
   <React.StrictMode><App /></React.StrictMode>,
   document.getElementById('root')
);
