import type { NextPage } from 'next';
import ServicesSection from '../src/services';
import IncidentsSection from '../src/incidents';
import useSystemStatus from '../src/services/hooks/useSystemStatus';
import { Status } from '../src/utils/constants';

const SECTION = 'mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)] py-[clamp(48px,6vw,80px)]';

// overall state → headline + dot colour
const STATE: Record<string, { title: string; dot: string }> = {
	[Status.OPERATIONAL]: { title: 'All systems normal', dot: 'bg-[var(--rd-ok)]' },
	[Status.PARTIAL_OUTAGE]: { title: 'Some systems degraded', dot: 'bg-[var(--rd-warn)]' },
	[Status.OUTAGE]: { title: 'Major outage', dot: 'bg-[var(--rd-down)]' },
	[Status.UNKNOWN]: { title: 'Status unknown', dot: 'bg-[var(--rd-text-4)]' },
};

const Home: NextPage = () => {
	const { systemStatus, isLoading } = useSystemStatus();
	const state = systemStatus ? (STATE[systemStatus.status] ?? STATE[Status.UNKNOWN]) : null;

	return (
		<main className="min-h-screen bg-[var(--rd-bg)] text-[var(--rd-text)]">
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

			<section className="mx-auto w-full max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-[clamp(1rem,3vw,2rem)] pt-[clamp(3.5rem,8vw,6.5rem)]">
				<div className="rd-rise min-w-0 max-w-[46rem]">
					<h1 className="m-0 flex flex-col gap-3">
						<span className="rd-display text-[var(--rd-text)] max-[799px]:text-[clamp(2.1rem,9vw,2.6rem)]">
							{state
								? state.title
								: isLoading
									? 'Checking systems…'
									: 'Service status'}
						</span>
						<span className="text-pretty text-[clamp(1.08rem,1.7vw,1.28rem)] font-medium leading-[1.35] tracking-[-0.02em] text-[var(--rd-text-2)]">
							Uptime across the hovanhoa.net family, over the last 90 days.
						</span>
					</h1>
					<p className="m-0 mt-[clamp(1.1rem,2vw,1.5rem)] flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--rd-text-3)]">
						<span
							aria-hidden
							className={`inline-block h-2 w-2 shrink-0 rounded-full ${
								state ? state.dot : 'bg-[var(--rd-text-4)]'
							} ${
								systemStatus?.status === Status.OPERATIONAL
									? 'animate-pulse motion-reduce:animate-none'
									: ''
							}`}
						/>
						{systemStatus?.datetime
							? `Last checked ${systemStatus.datetime}`
							: 'Checking…'}
					</p>
				</div>
			</section>

			<section className={SECTION}>
				<div className="mb-6">
					<h2 className="rd-h-sec m-0 text-[var(--rd-text)]">Services</h2>
					<p className="m-0 mt-2 max-w-[58ch] text-[0.95rem] leading-[1.6] text-[var(--rd-text-2)]">
						Each bar is one day. Hover a day to see how it went.
					</p>
				</div>
				<ServicesSection />
			</section>

			<section className="mx-auto max-w-[var(--rd-maxw)] px-[var(--rd-pad)] pb-[clamp(48px,6vw,80px)]">
				<div className="mb-6">
					<h2 className="rd-h-sec m-0 text-[var(--rd-text)]">Recent incidents</h2>
					<p className="m-0 mt-2 max-w-[58ch] text-[0.95rem] leading-[1.6] text-[var(--rd-text-2)]">
						Reported as GitHub issues and closed once resolved.
					</p>
				</div>
				<IncidentsSection />
			</section>
		</main>
	);
};

export default Home;
