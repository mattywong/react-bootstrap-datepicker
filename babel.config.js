module.exports = {
  presets: [
    "@babel/preset-typescript",
    "react-app",
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
  ],
  plugins: ["react-hot-loader/babel", "babel-plugin-styled-components"],
};
