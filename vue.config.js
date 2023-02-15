module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "BA FLIGHT - Plan de vuelo";
      return args;
    });
  },
};
