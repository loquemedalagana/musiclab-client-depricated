import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Routes from "./routes/routes";

import { fetchUser } from "./app/store/user";

import Landing from "./views/Pages/Landing/Landing";
import LinearLoading from "./components/Loading/LinearLoading";

import {
  Header,
  HeaderLinks, //loggedin or not loggedin
  HeaderLinksNotLoggedIn,
  //  Footer,
} from "./components/components";

import { appTitle } from "./app/helper/appTitle";

const App = (props) => {
  //load and store user state
  const { ...rest } = props;

  const [mobileOpen, setMobileOpen] = useState(false);

  const dispatch = useDispatch();
  const { loading, auth } = useSelector((state) => state.user); // auth state

  // 나중에 여기다가 유튜브 데이터 fetching하자

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <LinearLoading />; // 나중에 내 데이터 불러올때도 포함

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

export default App;
