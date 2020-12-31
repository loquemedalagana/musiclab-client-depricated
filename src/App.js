import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Routes from "./routes/routes";

import { fetchUser } from "./app/store/user";

import Landing from "./Pages/Landing";
import LinearLoading from "./components/Loading/LinearLoading";

const App = () => {
  //load and store user state
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user); // auth state

  // 나중에 여기다가 유튜브 데이터 fetching하자

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <LinearLoading />; // 나중에 내 데이터 불러올때도 포함

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
};

export default App;
