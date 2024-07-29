/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: process.env.BASE_URL,
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/accountslist',
                permanent: true,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'frontend-test-api.yoldi.agency',
                port: '',
                pathname: '/api/image/src/**',
            },
        ],
    },
}

export default nextConfig
