import React from "react";

export const isDesktop = window.innerWidth > 959;
export const MakeSpace = () => (isDesktop ? <br /> : null);
