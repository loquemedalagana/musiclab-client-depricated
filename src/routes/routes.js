import React from "react";
import { Switch, Route } from "react-router-dom";

// 권한 제어 상위 컴포넌트
import IsNotLoggedInRoute from "./HigherOrderComponets/IsNotLoggedInRoute";
import MemberRoute from "./HigherOrderComponets/MemberRoute";
import NonMemberRoute from "./HigherOrderComponets/NonMemberRoute";
import TokenRoute from "./HigherOrderComponets/TokenRoute";
import NonMemberRouteWithoutEmail from "./HigherOrderComponets/NonMemberWithoutEmail";

// auth 컴포넌트
import Login from "../views/Pages/Auth/Login";
import Signup from "../views/Pages/Auth/Signup";
import ResetPassword from "../views/Pages/Auth/ResetPassword";
import Levelup from "../views/Pages/Auth/Levelup";
import WaitingLevelup from "../views/Pages/Auth/WaitingLevelup";
import InputEmailForSocialUsers from "../views/Pages/Auth/InputEmailForSocialUsers";

// 프로필 컴포넌트
import Profile from "../views/Pages/Profile/ViewProfile/Profile";
import UpdateProfile from "../views/Pages/Profile/UpdateProfile/UpdateProfile";

// 유튜브 컴포넌트
import YoutubeVideoListByChannelProfile from "../views/Pages/YoutubeVideoPosts/YoutubeVideoListByChannelProfile";
import YoutubeVideoListBySearchKeyword from "../views/Pages/YoutubeVideoPosts/YoutubeVideoListBySearchKeyword";
import MyYoutubeVideoList from "../views/Pages/YoutubeVideoPosts/MyYoutubeVideoList";

// 포스트 컴포넌트

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
import { VIEW_PROFILE_ROUTE, EDIT_PROFILE_ROUTE } from "./params/profile";
import {
  YOUTUBE_CHANNEL_PROFILE_ROUTE,
  YOUTUBE_VIDEO_SEARCH_ROUTE,
  MY_YOUTUBE_VIDEO_LIST,
} from "./params/youtube";
import { SERVER_ERROR_ROUTE } from "./params/error";

const Routes = () => (
  <>
    <ToastAlert />
    <Switch>
      <IsNotLoggedInRoute exact path={LOGIN_ROUTE} component={Login} />
      <IsNotLoggedInRoute exact path={SIGNUP_ROUTE} component={Signup} />

      <TokenRoute
        exact
        path={`${RESET_PASSWORD_ROUTE}/:token?`}
        component={ResetPassword}
      />
      <TokenRoute exact path={`${LEVELUP_ROUTE}/:token?`} component={Levelup} />

      <NonMemberRoute
        exact
        path={WAITING_LEVELUP_ROUTE}
        component={WaitingLevelup}
      />
      <NonMemberRouteWithoutEmail
        exact
        path={EMAIL_REGISTER_ROUTE}
        component={InputEmailForSocialUsers}
      />

      <MemberRoute
        exact
        path={`${VIEW_PROFILE_ROUTE}/:userid`}
        component={Profile}
      />
      <MemberRoute
        exact
        path={`${EDIT_PROFILE_ROUTE}`}
        component={UpdateProfile}
      />

      <MemberRoute
        exact
        path={MY_YOUTUBE_VIDEO_LIST}
        component={MyYoutubeVideoList}
      />

      <Route
        exact
        path={`${YOUTUBE_CHANNEL_PROFILE_ROUTE}/:channel?`}
        component={YoutubeVideoListByChannelProfile}
      />
      <Route
        exact
        path={`${YOUTUBE_VIDEO_SEARCH_ROUTE}/:search?`}
        component={YoutubeVideoListBySearchKeyword}
      />

      <Route exact path={SERVER_ERROR_ROUTE} component={ServerError} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default Routes;
