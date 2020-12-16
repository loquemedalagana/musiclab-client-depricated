import React from "react";
import { Switch, Route } from "react-router-dom";

import IsNotLoggedInRoute from "./HigherOrderComponets/IsNotLoggedInRoute";
import MemberRoute from "./HigherOrderComponets/MemberRoute";
import NonMemberRoute from "./HigherOrderComponets/NonMemberRoute";
import TokenRoute from "./HigherOrderComponets/TokenRoute";
import NonMemberRouteWithoutEmail from "./HigherOrderComponets/NonMemberWithoutEmail";

import Login from "../views/Auth/Login";
import Signup from "../views/Auth/Signup";
import ResetPassword from "../views/Auth/ResetPassword";
import Levelup from "../views/Auth/Levelup";
import WaitingLevelup from "../views/Auth/WaitingLevelup";
import InputEmailForSocialUsers from "../views/Auth/InputEmailForSocialUsers";

import Profile from "../views/Pages/Profile/Profile";
import VideoListByOfficialChannel from "../views/VideoPosts/VideoListByOfficialChannel";
import VideoListByKeywords from "../views/VideoPosts/VideoListBySearchKeyword";

import UpdateProfile from "../views/Pages/Profile/UpdateProfile"; //not made yet
import NotFound from "../views/Pages/Error/NotFound";
import ServerError from "../views/Pages/Error/ServerError";

import ToastAlert from "../components/ToastAlerts/ToastAlerts";

const TestRoutes = () => (
  <>
    <ToastAlert />
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />

      <Route exact path="/resetpassword/:auth?" component={ResetPassword} />
      <Route exact path="/levelup/:auth?" component={Levelup} />

      <Route exact path="/waitinglevelup" component={WaitingLevelup} />
      <Route exact path="/emailregister" component={InputEmailForSocialUsers} />

      <Route exact path="/profiles/:userid" component={Profile} />
      <Route exact path="/modify/profile" component={UpdateProfile} />

      <Route
        exact
        path="/officialvideolist/:channel?"
        component={VideoListByOfficialChannel}
      />
      <Route
        exact
        path="/videolistbykeywords/:query?"
        component={VideoListByKeywords}
      />

      <Route exact path="/servererror" component={ServerError} />
      <Route component={NotFound} />
    </Switch>
  </>
);

// 본 개발 데이터
const Routes = () => (
  <>
    <ToastAlert />
    <Switch>
      <IsNotLoggedInRoute exact path="/login" component={Login} />
      <IsNotLoggedInRoute exact path="/signup" component={Signup} />

      <TokenRoute
        exact
        path="/resetpassword/:auth?"
        component={ResetPassword}
      />
      <TokenRoute exact path="/levelup/:auth?" component={Levelup} />

      <NonMemberRoute exact path="/waitinglevelup" component={WaitingLevelup} />
      <NonMemberRouteWithoutEmail
        exact
        path="/emailregister"
        component={InputEmailForSocialUsers}
      />

      <MemberRoute exact path="/profiles/:userid" component={Profile} />
      <MemberRoute exact path="/modify/profile" component={UpdateProfile} />

      <Route
        exact
        path="/officialvideolist/:channel?"
        component={VideoListByOfficialChannel}
      />
      <Route
        exact
        path="/videolistbykeywords/:query?"
        component={VideoListByKeywords}
      />

      <Route exact path="/servererror" component={ServerError} />
      <Route component={NotFound} />
    </Switch>
  </>
);

//export default Routes;

export default TestRoutes;
