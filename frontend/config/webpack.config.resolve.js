const path = require("path");

module.exports = {
  modules: ["node_modules", path.resolve(__dirname, "../", "src")].concat(
    process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
  ),
  alias: {
    Components: path.resolve(__dirname, "../", "src", "Components"),
    Redux: path.resolve(__dirname, "../", "src", "Redux"),
    "react-native": "react-native-web"
  }
};
