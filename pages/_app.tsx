import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>hovanhoa | status</title>
				<link rel="canonical" href="https://status.hovanhoa.net" />
				<meta
					name="keywords"
					content="Hồ Văn Hòa, hovanhoa, status, uptime, monitoring, service status, Software Engineer, Developer, Blog, Tech Blog, Vietnam Developer, system status, availability"
				/>
				<meta
					name="description"
					content="Hồ Văn Hòa - Status page for hovanhoa services. Monitor uptime and service availability."
				/>
				<meta name="author" content="Hồ Văn Hòa" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://status.hovanhoa.net" />
				<meta property="og:title" content="hovanhoa | status" />
				<meta
					property="og:description"
					content="Hồ Văn Hòa - Status page for hovanhoa services. Monitor uptime and service availability."
				/>
				<meta property="og:site_name" content="hovanhoa | status" />
				<meta property="og:image" content="https://status.hovanhoa.net/avatar.png" />
				<meta property="og:image:width" content="800" />
				<meta property="og:image:height" content="600" />
				<meta property="og:image:alt" content="Hồ Văn Hòa" />
				<meta property="og:locale" content="en_US" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@_hovanhoa_" />
				<meta name="twitter:creator" content="@_hovanhoa_" />
				<meta name="twitter:title" content="hovanhoa | status" />
				<meta
					name="twitter:description"
					content="Hồ Văn Hòa - Status page for hovanhoa services. Monitor uptime and service availability."
				/>
				<meta name="twitter:image" content="https://status.hovanhoa.net/avatar.png" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
