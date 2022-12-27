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
        path: process.env.NODE_ENV === "production" ? 'http://192.168.116.126:8080' : 'http://127.0.0.1:3000'
    },
    optimizeFonts: false,
}