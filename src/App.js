import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Layout from './Containers/Layout/Layout';
import Main from './Containers/Main/Main';

class App extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <Layout>
        <Main/>
      </Layout>
    );
  }

  }
  
export default App;
