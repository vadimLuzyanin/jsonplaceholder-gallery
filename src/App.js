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
      <div className="app">
        <GoBackLink />
        <Switch>
          <Redirect
            from={`${process.env.PUBLIC_URL}/`}
            to={`${process.env.PUBLIC_URL}/authors/`}
            exact
          />
          <Redirect
            from={`${process.env.PUBLIC_URL}/authors/:authorId`}
            to={`${process.env.PUBLIC_URL}/authors/:authorId/albums`}
            exact
          />
          <Redirect
            from={`${process.env.PUBLIC_URL}/authors/:authorId/albums/:albumId`}
            to={`${process.env.PUBLIC_URL}/authors/:authorId/albums/:albumId/photos`}
            exact
          />
          <Route path={`${process.env.PUBLIC_URL}/authors/`} exact>
            <AuthorsList />
          </Route>
          <Route
            path={`${process.env.PUBLIC_URL}/authors/:authorId/albums`}
            exact
          >
            <Albums />
          </Route>
          <Route
            path={`${process.env.PUBLIC_URL}/authors/:authorId/albums/:albumId/photos`}
            exact
          >
            <Photos />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
