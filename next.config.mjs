import path from "path";
/** @type {import('next').NextConfig} */
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
		config.resolve.alias["~"] = path.resolve(".");
		return config;
	},
};

export default nextConfig;
