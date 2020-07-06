import React from "react";
import "./App.css";
import AuthorsList from "./components/AuthorsList/AuthorsList";
import Albums from "./components/Albums/Albums";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Photos from "./components/Photos/Photos";
import GoBackLink from "./components/GoBackLink/GoBackLink";

const App = () => {
  return (
      <BrowserRouter>
        <div className='app'>
          <GoBackLink />
          <Switch>
            <Redirect from="/" to="/authors/" exact />
            <Redirect
              from="/authors/:authorId"
              to="/authors/:authorId/albums"
              exact
            />
            <Redirect
              from="/authors/:authorId/albums/:albumId"
              to="/authors/:authorId/albums/:albumId/photos"
              exact
            />
            <Route path="/authors/" exact>
              <AuthorsList />
            </Route>
            <Route path="/authors/:authorId/albums" exact>
              <Albums />
            </Route>
            <Route path="/authors/:authorId/albums/:albumId/photos" exact>
              <Photos />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
  );
};

export default App;
