/** @type {import('next').NextConfig} */
import path from "path";
const currentDir = path.dirname(new URL(import.meta.url).pathname);

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	webpack(config) {
		config.resolve.alias["~"] = path.resolve(currentDir);
		return config;
	},
};

export default nextConfig;
