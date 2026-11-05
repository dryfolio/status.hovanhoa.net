import { FunctionComponent } from 'react';
import { Status } from '../../../utils/constants';
import LogDaySummary from '../../types/LogDaySummary';

export type TooltipAlign = 'left' | 'center' | 'right';

interface ServiceLogProps {
	item: LogDaySummary;
	show: boolean;
	align: TooltipAlign;
}

const LABEL: Record<string, string> = {
	[Status.OPERATIONAL]: 'Operational',
	[Status.PARTIAL_OUTAGE]: 'Partial outage',
	[Status.OUTAGE]: 'Outage',
};

const POS: Record<TooltipAlign, string> = {
	left: 'left-0',
	center: 'left-1/2 -translate-x-1/2',
	right: 'right-0',
};

const StatusView: FunctionComponent<ServiceLogProps> = ({ item, show, align }) => {
	if (!show) return null;
	return (
		<div
			role="tooltip"
			className={`pointer-events-none absolute bottom-full z-20 mb-2 whitespace-nowrap rounded-[var(--rd-r-sm)] border border-[var(--rd-border)] bg-[var(--rd-surface)] px-3 py-2 ${POS[align]}`}
		>
			<p className="m-0 font-[family-name:var(--font-mono)] text-[0.7rem] text-[var(--rd-text-3)]">
				{item.date}
			</p>
			<p className="m-0 mt-0.5 text-[0.8rem] font-medium text-[var(--rd-text)]">
				{LABEL[item.status] ?? 'No data'}
			</p>
		</div>
	);
};

export default StatusView;
