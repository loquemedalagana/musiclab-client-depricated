import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Routes from "./routes/routes";

import { fetchUser, authSelector } from "./app/store/auth";

import Landing from "./views/Landing/Landing";
import LinearLoading from "./components/Loading/LinearLoading";

import {
  Header,
  HeaderLinks, //loggedin or not loggedin
  HeaderLinksNotLoggedIn,
  HeaderLinksTest,
  //  Footer,
} from "./components/components";

import { appTitle } from "./app/helperTexts/appTitle";

const AppTest = (props) => {
  const { ...rest } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(authSelector);
  const { loading, auth } = state;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <LinearLoading />;

  return (
    <Router>
      <Header
        color="transparent"
        brand={appTitle}
        rightLinks={
          <HeaderLinksTest
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "info",
        }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        {...rest}
      />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
};

const App = (props) => {
  //load and store user state
  const { ...rest } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector(authSelector);
  const { loading, auth } = state;

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <LinearLoading />;

  return (
    <Router>
      <Header
        color="transparent"
        brand={appTitle}
        rightLinks={
          auth ? (
            <HeaderLinks
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          ) : (
            <HeaderLinksNotLoggedIn
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          )
        }
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "info",
        }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        {...rest}
      />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
};

export default AppTest;
