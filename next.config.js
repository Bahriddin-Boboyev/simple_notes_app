/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "OPTIONS,DELETE,GET,PUT,POST,PATCH",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "X-Total-Count, Content-Range",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Origin, X-Requested-With, Content-Type, Accept, Range, Authorization",
          },
        ],
      },
    ];
  },
};

