export const VIEW_PROFILE_ROUTE = "/profiles"; //
export const MY_PROFILE_ROUTE = VIEW_PROFILE_ROUTE + "/my"; //userID 대신 나로~

// edit profile
export const EDIT_ROUTE = "/modify";
export const EDIT_PROFILE_ROUTE = EDIT_ROUTE + "/profile";
export const EDIT_TAGS_ROUTE = EDIT_PROFILE_ROUTE + "?edit=tags";
export const EDIT_SOCIAL_ROUTE = EDIT_PROFILE_ROUTE + "?edit=social";

export const EDIT_MY_VIDEO_LIST_ROUTE = EDIT_ROUTE + "/my-videolist";
export const CONFIGURE_LANGUAGE_ROUTE = EDIT_ROUTE + "/language-options";
