import { useState, useEffect } from 'react';
import Incident from '../types/Incident';
import MonthlyIncident from '../types/MonthlyIncident';

function useIncidents() {
	const [data, setData] = useState<MonthlyIncident[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			try {
				const issues = await loadIssues();
				const monthlyIncident = devideMonthly(
					issues.map((issue: any) => ({
						id: issue.id,
						title: issue.title,
						desciption: issue.body,
						status: issue.state,
						created_at: issue.created_at,
						closed_at: issue.closed_at,
						// The mirror stores label names; the API returns label objects.
						labels: issue.labels.map((label: any) => label.name ?? label),
					}))
				);
				setData(monthlyIncident);
			} catch (e: any) {
				setError(e);
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, []);

	return [data, isLoading, error];
}

// public/incidents.json is kept in sync with the `incident` issues by
// .github/workflows/incidents.yml. Reading it from raw.githubusercontent.com
// avoids the issues API's 60 requests/hour limit per IP, which visitors behind
// a shared proxy run out of; the API is only a fallback.
const SOURCES = [
	'https://raw.githubusercontent.com/dryfolio/status.hovanhoa.net/main/public/incidents.json',
	'https://api.github.com/repos/dryfolio/status.hovanhoa.net/issues?per_page=20&state=all&labels=incident',
];

async function loadIssues(): Promise<any[]> {
	let lastError: unknown;
	for (const url of SOURCES) {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`${response.status} ${url}`);
			const issues = await response.json();
			if (!Array.isArray(issues)) throw new Error(`Unexpected response from ${url}`);
			return issues;
		} catch (e) {
			lastError = e;
		}
	}
	throw lastError;
}

function devideMonthly(issues: any[]) {
	const incidents: MonthlyIncident[] = [];
	var monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	Object.values(
		issues.reduce((r, date) => {
			const [year, month, day] = date.created_at.substr(0, 10).split('-');
			const key = `${year}_${month}`;
			r[key] = r[key] || {
				month: `${monthNames[parseInt(month) - 1]} ${year}`,
				incidents: [],
			};
			r[key].incidents.push(date);
			return r;
		}, {})
	).forEach((month: any) => {
		incidents.push({
			month: month.month,
			incidents: month.incidents,
		});
	});

	return incidents;
}

export default useIncidents;
