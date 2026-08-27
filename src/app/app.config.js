module.exports = {
  expo: {
    name: "BarberHubMobile",
    slug: "barberhubmobile",
    version: "1.0.0",

    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
      basePath: "/barbermobile",
    },

    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      ],
    ],
  },
};
