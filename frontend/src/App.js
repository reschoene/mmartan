import React, {Component} from 'react';
import './App.scss';
import Main from './components/MainComponent/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

export default App;
