import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Navbar from "~/components/Navbar";

import { cn } from "~/lib/utils";
import "~/styles/globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "HireHub",
	description: "HireHub is a platform for hiring and job searching.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
