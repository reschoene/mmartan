import React, {Component} from 'react';
import './App.scss';
import Main from './components/MainComponent/Main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

/**
 * The root Application's component. It's rendered by Index.js
 */
class App extends Component{
  render(){
    return(
      <Provider store={store}> {/** Makes redux store available to Main and all it's child components */}
        <Main/>
      </Provider>
    );
  }
}

export default App;
