import useIncidents from './hooks/useIncidents';
import type { FunctionComponent, ReactNode } from 'react';
import Incidents from './types/Incident';
import MonthlyIncident from './types/MonthlyIncident';

// Dates in an issue body's hidden metadata (see parseNote) may be plain
// YYYY-MM-DD when the exact time isn't known; show those without a time.
const formatDate = (date: string) => {
	const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(date);
	return new Date(dateOnly ? `${date}T00:00:00` : date).toLocaleString([], {
		month: 'short',
		day: 'numeric',
		...(dateOnly ? {} : { hour: 'numeric', minute: 'numeric' }),
	});
};

// Label on the GitHub issue -> how the incident is presented.
const KINDS: Record<string, { label: string; tone: string }> = {
	outage: {
		label: 'Outage',
		tone: 'bg-[var(--rd-label-plum)] text-[var(--rd-label-plum-fg)]',
	},
	maintenance: {
		label: 'Maintenance',
		tone: 'bg-[var(--rd-label-pine)] text-[var(--rd-label-pine-fg)]',
	},
};
const DEFAULT_KIND = {
	label: 'Incident',
	tone: 'bg-[var(--rd-label-slate)] text-[var(--rd-label-slate-fg)]',
};

const kindOf = (labels: string[]) =>
	labels.map((l) => KINDS[l.toLowerCase()]).find(Boolean) ?? DEFAULT_KIND;

type Block = { type: 'p'; text: string } | { type: 'ul'; items: string[] };

// An issue body is a short note: paragraphs and "- " bullet lists, with
// optional hidden metadata such as <!-- started: 2026-11-11 --> and
// <!-- resolved: 2026-11-12 --> to show the real window when the issue was
// filed after the fact.
function parseNote(body: string | null) {
	const meta: Record<string, string> = {};
	const text = (body ?? '')
		.replace(/\r/g, '')
		.replace(/<!--\s*(\w+):\s*(.*?)\s*-->/g, (_, key, value) => {
			meta[key.toLowerCase()] = value;
			return '';
		})
		.trim();

	const blocks: Block[] = [];
	for (const chunk of text.split(/\n{2,}/)) {
		const lines = chunk.split('\n').filter((l) => l.trim());
		if (lines.length === 0) continue;
		if (lines.every((l) => /^\s*[-*] /.test(l))) {
			blocks.push({
				type: 'ul',
				items: lines.map((l) => l.replace(/^\s*[-*] /, '')),
			});
		} else {
			blocks.push({ type: 'p', text: lines.join(' ') });
		}
	}
	return { meta, blocks };
}

// **bold** is the only inline markup the notes use.
const inline = (text: string): ReactNode[] =>
	text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
		part.startsWith('**') && part.endsWith('**') ? (
			<strong key={i} className="font-medium text-[var(--rd-text)]">
				{part.slice(2, -2)}
			</strong>
		) : (
			part
		)
	);

const Note: FunctionComponent<{ blocks: Block[] }> = ({ blocks }) => (
	<div className="mt-3 flex max-w-[64ch] flex-col gap-2.5 text-[0.9rem] leading-[1.6] text-[var(--rd-text-2)]">
		{blocks.map((block, i) =>
			block.type === 'p' ? (
				<p key={i} className="m-0">
					{inline(block.text)}
				</p>
			) : (
				<ul
					key={i}
					className="m-0 flex list-none flex-col gap-1.5 border-l border-[var(--rd-line)] p-0 pl-4"
				>
					{block.items.map((item, j) => (
						<li key={j} className="m-0">
							{inline(item)}
						</li>
					))}
				</ul>
			)
		)}
	</div>
);

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
							const { meta, blocks } = parseNote(incident.desciption);
							const started = meta.started ?? incident.created_at;
							const ended = meta.resolved ?? incident.closed_at;
							const kind = kindOf(incident.labels ?? []);
							return (
								<li
									key={incident.id}
									className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-[var(--rd-line)] py-5 sm:grid-cols-[11rem_minmax(0,1fr)]"
								>
									<span className="font-[family-name:var(--font-mono)] text-[0.72rem] leading-[1.9] text-[var(--rd-text-3)]">
										{formatDate(started)}
										{resolved && ended && <> – {formatDate(ended)}</>}
									</span>
									<div className="min-w-0">
										<div className="flex flex-wrap items-center gap-2">
											<span
												className={`rounded-full px-2 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.06em] ${kind.tone}`}
											>
												{kind.label}
											</span>
											<p className="m-0 text-[0.95rem] font-medium tracking-[-0.02em] text-[var(--rd-text)]">
												{incident.title}
											</p>
										</div>
										<p className="m-0 mt-1.5 flex items-center gap-2 text-[0.8rem] text-[var(--rd-text-3)]">
											<span
												aria-hidden
												className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
													resolved ? 'bg-[var(--rd-ok)]' : 'bg-[var(--rd-warn)]'
												}`}
											/>
											{resolved ? 'Resolved' : 'Investigating'}
										</p>
										{blocks.length > 0 && <Note blocks={blocks} />}
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
