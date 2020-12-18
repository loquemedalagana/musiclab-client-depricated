import React from "react";
import { Switch, Route } from "react-router-dom";

// 권한 제어 상위 컴포넌트
import IsNotLoggedInRoute from "./HigherOrderComponets/IsNotLoggedInRoute";
import MemberRoute from "./HigherOrderComponets/MemberRoute";
import NonMemberRoute from "./HigherOrderComponets/NonMemberRoute";
import TokenRoute from "./HigherOrderComponets/TokenRoute";
import NonMemberRouteWithoutEmail from "./HigherOrderComponets/NonMemberWithoutEmail";

// 페이지 컴포넌트
import Login from "../views/Pages/Auth/Login";
import Signup from "../views/Pages/Auth/Signup";
import ResetPassword from "../views/Pages/Auth/ResetPassword";
import Levelup from "../views/Pages/Auth/Levelup";
import WaitingLevelup from "../views/Pages/Auth/WaitingLevelup";
import InputEmailForSocialUsers from "../views/Pages/Auth/InputEmailForSocialUsers";

import Profile from "../views/Pages/Profile/ViewProfile/Profile";
import VideoListByYoutubeChannelProfile from "../views/Pages/VideoPosts/VideoListByYoutubeChannelProfile";
import VideoListBySearchKeyword from "../views/Pages/VideoPosts/VideoListBySearchKeyword";
import UpdateProfile from "../views/Pages/Profile/UpdateProfile/UpdateProfile";

// 에러 페이지 컴포넌트
import NotFound from "../views/Pages/Error/NotFound";
import ServerError from "../views/Pages/Error/ServerError";

// 알람 컴포넌트
import ToastAlert from "../components/ToastAlerts/ToastAlerts";

// 라우트 parameter 컴포넌트
import {
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  EMAIL_REGISTER_ROUTE,
  WAITING_LEVELUP_ROUTE,
  LEVELUP_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "./params/auth";
import { VIEW_PROFILE_ROUTE } from "./params/profile";
import {
  VIDEO_CHANNEL_PROFILE_ROUTE,
  VIDEO_SEARCH_ROUTE,
} from "./params/video";
import { SERVER_ERROR_ROUTE } from "./params/error";

const TestRoutes = () => (
  <>
    <ToastAlert />
    <Switch>
      <Route exact path={LOGIN_ROUTE} component={Login} />
      <Route exact path={SIGNUP_ROUTE} component={Signup} />

      <Route exact path={`${RESET_PASSWORD_ROUTE}`} component={ResetPassword} />
      <Route exact path={`${LEVELUP_ROUTE}`} component={Levelup} />

      <Route exact path={WAITING_LEVELUP_ROUTE} component={WaitingLevelup} />
      <Route
        exact
        path={EMAIL_REGISTER_ROUTE}
        component={InputEmailForSocialUsers}
      />

      <Route exact path={`${VIEW_PROFILE_ROUTE}/:userid`} component={Profile} />
      <Route exact path="/modify/profile" component={UpdateProfile} />

      <Route
        exact
        path={`${VIDEO_CHANNEL_PROFILE_ROUTE}/:channel`}
        component={VideoListByYoutubeChannelProfile}
      />
      <Route
        exact
        path={`${VIDEO_SEARCH_ROUTE}/:search?`}
        component={VideoListBySearchKeyword}
      />

      <Route exact path={SERVER_ERROR_ROUTE} component={ServerError} />
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
        component={VideoListByYoutubeChannelProfile}
      />
      <Route
        exact
        path="/videolistbykeywords/:query?"
        component={VideoListBySearchKeyword}
      />

      <Route exact path="/servererror" component={ServerError} />
      <Route component={NotFound} />
    </Switch>
  </>
);

//export default Routes;

export default TestRoutes;
