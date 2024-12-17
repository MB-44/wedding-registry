"use client";

import React from "react";
import LOGIN_PAGE from "./login/page";
import MAIN_DASHBOARD from "./mainDashboard/page";

export default function Home() {
  return(
    <div>
      <MAIN_DASHBOARD/>
      {/* <LOGIN_PAGE/> */}
    </div>
  )
}