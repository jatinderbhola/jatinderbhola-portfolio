import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

export const metadata: Metadata = {
	title: {
		default: "jatinderbhola.com",
		template: "%s | jatinderbhola.com",
	},
	description: "Jatinder Bhola, with over 8 years of experience since 2013, excels in software engineering and team leadership. Specializes in problem-solving, innovative solutions, and managing the entire software development lifecycle. Proficient in Node.js, Angular JS, MongoDB, JavaScript, REST APIs, and familiar with Java, SQL, AWS, Google Cloud Services. Adept in frontend and backend development, leveraging cloud platforms and modern tools like React, Redux, Angular, Heroku, and Visual Studio Code. Committed to delivering high-quality, scalable software solutions that enhance business productivity",
	openGraph: {
		title: "jatinderbhola.com",
		description: "Jatinder Bhola, with over 8 years of experience since 2013, excels in software engineering and team leadership. Specializes in problem-solving, innovative solutions, and managing the entire software development lifecycle. Proficient in Node.js, Angular JS, MongoDB, JavaScript, REST APIs, and familiar with Java, SQL, AWS, Google Cloud Services. Adept in frontend and backend development, leveraging cloud platforms and modern tools like React, Redux, Angular, Heroku, and Visual Studio Code. Committed to delivering high-quality, scalable software solutions that enhance business productivity",
		url: "https://jatinderbhola.com",
		siteName: "jatinderbhola.com",
		images: [
			{
				url: "https://jatinderbhola.com/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "jatinder bhola",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}
