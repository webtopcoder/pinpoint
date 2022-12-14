const path = require('path')

module.exports = {
    trailingSlash: true,
    distDir: 'build',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        loader: 'akamai',
        path: process.env.NODE_ENV === "production" ? 'https://abev-react.envytheme.com' : 'http://192.168.116.126:3000'
    },
    optimizeFonts: false,
}