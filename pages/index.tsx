import type { NextPage } from 'next';
import ServicesSection from '../src/services';
import Navbar from '../src/components/nav';
import { Footer } from '../src/components/footer';
import { Eyebrow } from '../src/components/redesign/eyebrow';

const Home: NextPage = () => {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						name: 'hovanhoa | status',
						url: 'https://status.hovanhoa.net',
						description:
							'Hồ Văn Hòa - Status page for hovanhoa services. Monitor uptime and service availability.',
						author: {
							'@type': 'Person',
							name: 'Hồ Văn Hòa',
							alternateName: 'hovanhoa',
							jobTitle: 'Software Engineer',
						},
					}),
				}}
			/>
			<main className="min-h-screen">
				{/* sticky header */}
				<header className="sticky top-0 z-50 border-b border-[var(--rd-border-2)] bg-[var(--rd-bg-sub)] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
					<div className="mx-auto w-full max-w-[var(--rd-maxw)] px-[var(--rd-pad)] py-3">
						<Navbar />
					</div>
				</header>
				{/* header panel */}
				<div
					className="border-b border-[var(--rd-border)]"
					style={{
						background:
							'radial-gradient(100% 140% at 0% 0%, var(--rd-accent-bg), transparent 55%), var(--rd-surface-2)',
					}}
				>
					<div className="mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pt-12 pb-12">
						<Eyebrow>hovanhoa · status</Eyebrow>
						<h1 className="mt-[18px] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold tracking-[-0.04em] text-[var(--rd-text)]">
							service status
						</h1>
						<p className="rd-lead mt-5">
							uptime and availability across the hovanhoa.net
							services, checked regularly over the last 90 days.
						</p>
					</div>
				</div>
				{/* body */}
				<div className="mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)]">
					<ServicesSection />
				</div>
				<Footer />
			</main>
		</>
	);
};

export default Home;
