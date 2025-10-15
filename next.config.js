/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'upload.wikimedia.org',
    ],
  },
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
}

module.exports = nextConfig 