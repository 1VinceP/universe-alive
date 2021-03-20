module.exports = {
   pwa: {
      themeColor: '#323231',
      msTileColor: '#323231',
      name: 'Universe Alive',
      workboxOptions: {
         exclude: [/\.map$/, /_redirects/],
      },
   },
   css: {
      loaderOptions: {
         sass: {
            prependData: '@import "@/_variables.scss";',
         },
      },
   },
   devServer: {
      proxy: 'http://localhost:8081',
   },
};
