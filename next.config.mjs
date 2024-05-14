// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      turbo: {
        loaders: {
          'css-loader': {
            sourceMap: true,
          },
        },
      },
    },
  };
  
  export default nextConfig;
  