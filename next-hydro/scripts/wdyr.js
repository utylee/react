/// <reference types="@welldone-software/why-did-you-render" />
import React from "react";

// console.log(
//   `testing if WDYR.  (typeof window): ${typeof window}. process.env.NODE_ENV: ${
//     process.env.NODE_ENV
//   }`
// );

// from https://github.com/welldone-software/why-did-you-render/issues/84#issuecomment-63409862
if (process.env.NODE_ENV === "development") {
  if (typeof window !== "undefined") {
    const whyDidYouRender = require("@welldone-software/why-did-you-render");
    console.log("wdyr started");
    whyDidYouRender(React, {
      trackAllPureComponents: true,
    });

    // // See https://github.com/welldone-software/why-did-you-render#options
    // whyDidYouRender(React, {
    //   trackAllPureComponents: true,
    //   trackHooks: true,
    //   logOwnerReasons: true,
    //   collapseGroups: true,
    // });
  }
}
