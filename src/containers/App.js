import React from 'react';
import logo from '../assets/logo.svg';
import Pane from './Pane'
import SampleForm from '../components/SampleForm'
import Grid from '@material-ui/core/Grid'
import '../styles/App.css';

function App() {
 
  return (
    <Grid container justify="center" direction="row" alignContent="center">
      <Grid item xs={2}>
        <SampleForm></SampleForm>
      </Grid>
      <Grid item xs={2}>
        <Pane></Pane>
      </Grid>
    </Grid>
  );
}

export default App;
