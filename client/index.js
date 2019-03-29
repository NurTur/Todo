import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BaseReducer from "./store/BaseReducer";
import HomePageCode from "./services/homePage";
import AuthPageCode from "./services/authPage";

import "./scss/headerPage.scss";
import "./scss/loginPage.scss";
import "./scss/pageView.scss";
import "./scss/modalPage.scss";
import "./scss/uploadImage.scss";


const store = createStore(BaseReducer);

store.subscribe(() => console.log(store.getState()));

class Main extends React.Component {
  state = { HomePage: null, AuthPage: null }

  componentDidMount() {
    this.onLoad();
  }

  onLoad = async () => {
    const AuthPage = await AuthPageCode();
    const HomePage = await HomePageCode();
    this.setState({ HomePage, AuthPage });
  }

  render() {
    const { AuthPage, HomePage } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthPage} />
            <Route path="/game" component={HomePage} />
          </Switch>
        </Router>
      </Provider>);
  }
}


ReactDOM.render(<Main />,
  document.getElementById("app")
)


