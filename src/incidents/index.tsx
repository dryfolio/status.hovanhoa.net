import useIncidents from './hooks/useIncidents';
import type { FunctionComponent } from 'react';
import Incidents from './types/Incident';
import MonthlyIncident from './types/MonthlyIncident';

const formatDate = (date: string) => {
	return new Date(date).toLocaleString([], {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
};

const IncidentsSection: FunctionComponent = () => {
	const [monthlyIncidents, isIncidentsLoading] = useIncidents();
	const months = (monthlyIncidents as MonthlyIncident[]) || [];

	if (isIncidentsLoading) {
		return (
			<p className="m-0 font-[family-name:var(--font-mono)] text-[0.8rem] text-[var(--rd-text-3)]">
				Loading incidents…
			</p>
		);
	}

	if (!Array.isArray(months) || months.length === 0) {
		return (
			<p className="m-0 border-t border-[var(--rd-line)] pt-5 text-[0.95rem] text-[var(--rd-text-2)]">
				No incidents reported recently.
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-10">
			{months.map((incidents) => (
				<div key={incidents.month}>
					<p className="m-0 border-b border-[var(--rd-line)] pb-2.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--rd-text-3)]">
						{incidents.month}
					</p>
					<ol className="m-0 list-none p-0">
						{(incidents.incidents as Incidents[]).map((incident) => {
							const resolved = incident.status === 'closed';
							return (
								<li
									key={incident.id}
									className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-[var(--rd-line)] py-4 sm:grid-cols-[11rem_minmax(0,1fr)]"
								>
									<span className="font-[family-name:var(--font-mono)] text-[0.72rem] leading-[1.9] text-[var(--rd-text-3)]">
										{formatDate(incident.created_at)}
										{resolved && incident.closed_at && (
											<> – {formatDate(incident.closed_at)}</>
										)}
									</span>
									<div className="min-w-0">
										<p className="m-0 text-[0.95rem] font-medium tracking-[-0.02em] text-[var(--rd-text)]">
											{incident.title}
										</p>
										<p className="m-0 mt-1 flex items-center gap-2 text-[0.85rem] text-[var(--rd-text-2)]">
											<span
												aria-hidden
												className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
													resolved
														? 'bg-[var(--rd-ok)]'
														: 'bg-[var(--rd-warn)]'
												}`}
											/>
											{resolved
												? 'This incident has been resolved.'
												: 'This incident is currently being investigated.'}
										</p>
									</div>
								</li>
							);
						})}
					</ol>
				</div>
			))}
		</div>
	);
};

export default IncidentsSection;
