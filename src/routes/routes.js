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

import Profile from "../views/Profile/Profile";
import VideoListByOfficialChannel from "../views/VideoPosts/VideoListByOfficialChannel";
import VideoListByKeywords from "../views/VideoPosts/VideoListBySearchKeyword";

import UpdateProfile from "../views/Profile/UpdateProfile"; //not made yet
import NotFound from "../views/Error/NotFound";
import ServerError from "../views/Error/ServerError";

import ToastAlert from "../components/ToastAlerts/ToastAlerts";

//aaa.com/member/active?token=abcdefg1234
// ~.com/levelup/?token=ABCDE

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

export default Routes;
