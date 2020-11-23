import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import web3 from './web3';
import './index.css';
import { payloadGenerator } from './payloadGenerator';
import registration from './contract';

import {
   Container,
   Row,
   Col,
   Button,
   FormLabel,
   FormControl,
   FormGroup,
   Card
} from 'react-bootstrap';

const App = () => {

   const [account, setAccount] = useState('');
   const [healthy, setHealthy] = useState(null);
   const [othHealthy, setOthHealthy] = useState(null);
   const [payload, setPayload] = useState('');
   const [othPayload, setOthPayload] = useState('');
   const [checkPayload, setCheckPayload] = useState('');

   const registerUser = async () => {
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

   const viewHealth = async () => {
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

   const toggleHealth = async () => {
      try {
         await registration.methods.toggleMyHealth().send({
            from: account
         });
         setHealthy(!healthy);
      }
      catch (err) {
         console.log('toggleHealth : ', err);
      }
   }

   const registerPayload = async () => {
      const _payload = payloadGenerator(5);
      try {
         await registration.methods.registerPayload(_payload).send({
            from: account
         });
         setPayload(_payload);
      }
      catch (err) {
         console.log('registerPayload : ', err);
      }
   }

   const registerContact = async () => {
      try {
         await registration.methods.registerContact(payload, othPayload).send({
            from: account
         });
         console.log('contact registered');
      }
      catch (err) {
         console.log('registerContact : ', err);
      }
   }

   const checkStatus = async () => {
      try {
         const _othHealthy = await registration.methods.checkStatus(payload, checkPayload).send({
            from: account
         });
         setOthHealthy(_othHealthy);
      }
      catch (err) {
         console.log('checkStatus : ', err);
      }
   }

   useEffect(() => {
      const fetchAccount = async () => {
         try {
            const _account = (await web3.eth.getAccounts())[0];
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
               <Col xs={12} className='text-center'>
                  <h1 className='display-4'> CovidShield </h1>
               </Col>

               <Col md={4} className='text-center'>
                  <Card>
                     <Card.Body>
                        <FormGroup>
                           <FormLabel>Not Registered ?</FormLabel><br />
                           <Button variant='outline-light' onClick={() => registerUser()}>New Registration</Button>
                        </FormGroup>
                     </Card.Body>
                  </Card>
               </Col>

               <Col md={4} className='text-center'>
                  <Card>
                     <Card.Body>
                        <FormGroup>
                           <FormLabel>View your health status.</FormLabel><br />
                           <FormLabel>Current Status: {healthy === null ? 'unknown' : (healthy === true ? 'Safe' : 'At Risk')}</FormLabel><br />
                           <Button variant='outline-light' onClick={() => viewHealth()}>View Health</Button>
                        </FormGroup>
                     </Card.Body>
                  </Card>
               </Col>

               <Col md={4} className='text-center'>
                  <Card>
                     <Card.Body>
                        <FormGroup>
                           <FormLabel>Report if you're Covid positive.</FormLabel><br />
                           <Button variant='outline-light' onClick={() => toggleHealth()}>Toggle Health</Button>
                        </FormGroup>
                     </Card.Body>
                  </Card>
               </Col>

               <Col md={4} className='text-center'>
                  <Card>
                     <Card.Body>
                        <FormGroup>
                           <FormLabel>Generate new Payload</FormLabel><br />
                           <FormLabel>Current Payload: {payload}</FormLabel><br />
                           <Button variant='outline-light' onClick={() => registerPayload()}> Generate new Payload</Button>
                        </FormGroup>
                     </Card.Body>
                  </Card>
               </Col>

               <Col md={4} className='text-center'>
                  <Card>
                     <Card.Body>
                        <FormGroup>
                           <FormLabel>Register Contact</FormLabel><br />
                           <FormControl
                              type='text'
                              placeholder='Others Payload'
                              value={othPayload}
                              onChange={(e) => setOthPayload(e.target.value)} /><br />
                           <Button variant='outline-light' onClick={() => registerContact()}> Submit</Button>
                        </FormGroup>
                     </Card.Body>
                  </Card>
               </Col>

               <Col md={4} className='text-center'>
                  <Card>
                     <Card.Body>
                        <FormGroup>
                           <FormLabel>Check SomeOne's Health Status</FormLabel><br />
                           <FormLabel>Healthy: {othHealthy}</FormLabel>
                           <FormControl
                              type='text'
                              placeholder='Others Payload'
                              value={checkPayload}
                              onChange={(e) => setCheckPayload(e.target.value)} /><br />
                           <Button variant='outline-light' onClick={() => checkStatus()}> Submit</Button>
                        </FormGroup>
                     </Card.Body>
                  </Card>
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
