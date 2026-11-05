import { FunctionComponent } from 'react';
import { Status } from '../../../utils/constants';
import LogDaySummary from '../../types/LogDaySummary';
import Service from '../../types/Service';
import ServiceLog from '../log';

interface ServiceItemProps {
	item: Service;
}

const DOT: Record<string, string> = {
	[Status.OPERATIONAL]: 'bg-[var(--rd-ok)]',
	[Status.PARTIAL_OUTAGE]: 'bg-[var(--rd-warn)]',
	[Status.OUTAGE]: 'bg-[var(--rd-down)]',
};

// days shown on narrow screens (the strip keeps all 90 from sm up)
const MOBILE_DAYS = 30;

const ServiceItem: FunctionComponent<ServiceItemProps> = ({ item }) => {
	const logs = (item.logs || []) as LogDaySummary[];

	const calculateUpTime = () => {
		let successCount = logs.filter((log) => log.status === Status.OPERATIONAL).length;
		return Math.round((successCount * 100) / 90);
	};

	return (
		<li className="border-b border-[var(--rd-line)] px-[1.15rem] py-4 last:border-b-0">
			<div className="flex items-center gap-3">
				<span
					aria-hidden
					className={`inline-block h-2 w-2 shrink-0 rounded-full ${
						DOT[item.status] ?? 'bg-[var(--rd-text-4)]'
					}`}
				/>
				<a
					href={`https://${item.name}`}
					target="_blank"
					rel="noopener noreferrer"
					className="min-w-0 flex-1 truncate text-[0.95rem] font-medium tracking-[-0.02em] text-[var(--rd-text)] transition-colors hover:text-[var(--rd-accent-ink)]"
				>
					{item.name}
				</a>
				<span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.72rem] text-[var(--rd-text-3)]">
					{calculateUpTime()}% uptime
				</span>
			</div>
			<div className="mt-3 flex h-6 items-stretch gap-[3px] max-sm:gap-[2px]">
				{logs.map((log, i) => (
					<ServiceLog
						key={log.date}
						item={log}
						align={
							i < logs.length / 4
								? 'left'
								: i >= (logs.length * 3) / 4
									? 'right'
									: 'center'
						}
						mobileHidden={i < logs.length - MOBILE_DAYS}
					/>
				))}
			</div>
		</li>
	);
};

export default ServiceItem;
