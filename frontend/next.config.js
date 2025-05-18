/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      const cssLoader = config.module.rules.find(
        (rule) => rule.oneOf && rule.oneOf.some((r) => r.use && r.use.loader && r.use.loader.includes('css-loader'))
      );
  
      if (cssLoader) {
        cssLoader.oneOf.forEach((rule) => {
          if (rule.use && Array.isArray(rule.use)) {
            rule.use.forEach((u) => {
              if (u.loader && u.loader.includes('css-loader')) {
                u.options = {
                  ...u.options,
                  esModule: false, // Disable pure selectors check
                };
              }
            });
          }
        });
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;