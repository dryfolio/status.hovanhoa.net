import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
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
