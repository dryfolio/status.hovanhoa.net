import { FunctionComponent, useState } from 'react';
import { Status } from '../../../utils/constants';
import LogDaySummary from '../../types/LogDaySummary';
import StatusView, { TooltipAlign } from './Status';

interface ServiceLogProps {
	item: LogDaySummary;
	align: TooltipAlign;
	mobileHidden?: boolean;
}

const BAR: Record<string, string> = {
	[Status.OPERATIONAL]: 'bg-[var(--rd-ok)]',
	[Status.PARTIAL_OUTAGE]: 'bg-[var(--rd-warn)]',
	[Status.OUTAGE]: 'bg-[var(--rd-down)]',
};

const ServiceLog: FunctionComponent<ServiceLogProps> = ({ item, align, mobileHidden }) => {
	const [show, setShow] = useState(false);
	const colour = BAR[item.status] ?? 'bg-[var(--rd-border)]';

	return (
		<div
			onMouseOver={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
			className={`relative min-w-0 flex-1 ${mobileHidden ? 'max-sm:hidden' : ''}`}
		>
			<div
				className={`h-full w-full rounded-full transition-opacity ${colour} ${
					show ? 'opacity-70' : ''
				}`}
			/>
			<StatusView item={item} show={show} align={align} />
		</div>
	);
};

export default ServiceLog;
