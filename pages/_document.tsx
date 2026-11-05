import { Html, Head, Main, NextScript } from 'next/document';

// serif display face for headings — same stylesheet as hovanhoa.net
const DISPLAY_FONTS =
	'https://fonts.googleapis.com/css2?family=Libertinus+Serif:ital,wght@0,400;0,600;1,400&family=Noto+Serif:ital,wght@0,400;0,600;1,400&display=swap';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				{/* eslint-disable-next-line @next/next/no-page-custom-font */}
				<link rel="stylesheet" href={DISPLAY_FONTS} />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(dark|light)/);if(m&&m[1]==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
					}}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
