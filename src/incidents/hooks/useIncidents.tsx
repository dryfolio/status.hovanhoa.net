import { useState, useEffect } from "react";
import MonthlyIncident from "../types/MonthlyIncident";

function useIncidents() {
    const [data, setData] = useState<MonthlyIncident[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("https://api.github.com/repos/dryfolio/status.hovanhoa.net/issues?per_page=20&state=all&labels=incident");
                const issues = await response.json();
                const monthlyIncident = divideMonthly(issues.map((issue: { id: number; title: string; body: string; state: string; created_at: string; closed_at: string; labels: { name: string }[] }) => ({
                    id: issue.id,
                    title: issue.title,
                    description: issue.body,
                    status: issue.state,
                    created_at: issue.created_at,
                    closed_at: issue.closed_at,
                    labels: issue.labels.map((label) => label.name)
                })));
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

function divideMonthly(issues: { created_at: string }[]): MonthlyIncident[] {
    const incidents: MonthlyIncident[] = [];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    Object.values(issues.reduce((r, date) => {
        const [year, month] = date.created_at.slice(0, 10).split('-');
        const key = `${year}_${month}`;
        r[key] = r[key] || { month: `${monthNames[parseInt(month) - 1]} ${year}`, incidents: [] };
        r[key].incidents.push(date);
        return r;
    }, {}) as Record<string, { month: string; incidents: Incident[] }>).forEach((month) => {
        incidents.push({
            month: month.month,
            incidents: month.incidents
        });
    });

    return incidents;
}


export default useIncidents;
