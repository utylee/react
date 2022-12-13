const path = require("path");

module.exports = {
  reactStrictMode: true,
  assetPrefix: "/hydro",

  // webpack(config, { dev, isServer }) {
  //   if (dev && !isServer) {
  //     const originalEntry = config.entry;
  //     config.entry = async () => {
  //       const wdrPath = path.resolve(__dirname, "./scripts/wdyr.ts");
  //       const entries = await originalEntry();

  //       if (entries["main.js"] && !entries["main.js"].includes(wdrPath)) {
  //         entries["main.js"].push(wdrPath);
  //       }
  //       return entries;
  //     };
  //   }

  //   return config;
  // },

  // jsxImportSource: "@welldone-software/why-did-you-render",

  // webpack(config, { dev, isServer }) {
  //   // why did you render
  //   if (dev && !isServer) {
  //     const originalEntry = config.entry;
  //     config.entry = async () => {
  //       const wdrPath = path.resolve(__dirname, "./pages/wdyr.js");
  //       const entries = await originalEntry();
  //       if (entries["main.js"] && !entries["main.js"].includes(wdrPath)) {
  //         entries["main.js"].unshift(wdrPath);
  //       }
  //       return entries;
  //     };
  //   }

  //   return config;
  // },
};
