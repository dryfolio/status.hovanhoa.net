import { useState, useEffect } from "react";
import Service from '../types/Service';
import Log from "../types/Log";
import LogDaySummary from "../types/LogDaySummary";
import { Status } from "../../utils/constants";

function useServices() {
    const [data, setData] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("./urls.cfg");
                const configText = await response.text();
                const configLines = configText.split("\n");

                const services: Service[] = []
                for (let ii = 0; ii < configLines.length; ii++) {
                    const configLine = configLines[ii];
                    const [key, _url] = configLine.split("=");
                    if (!key || !_url) {
                        continue;
                    }
                    const log = await logs(key);

                    if (log.length > 0) {
                        services.push({ id: ii, name: key, status: log[log.length - 1].status, logs: log })
                    } else {
                        services.push({ id: ii, name: key, status: "unknown", logs: log })
                    }
                }
                setData(services as Service[]);
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

async function logs(serviceKey: string): Promise<LogDaySummary[]> {
    const response = await fetch(`https://raw.githubusercontent.com/dryfolio/status.hovanhoa.net/main/public/status/${serviceKey}_report.log`);

    const text = await response.text();
    const lines = text.split("\n");

    const parsedLogs: Log[] = [];
    lines.forEach((line: string) => {
        const [created_at, status, response_time] = line.split(", ");
        if (created_at) {
            parsedLogs.push({ id: created_at, response_time, status, created_at });
        }
    });

    const prepareSummary = Object.values(parsedLogs.reduce((r: Record<string, { date: string; logs: Log[] }>, logEntry) => {
        const [year, month, day] = logEntry.created_at.slice(0, 10).split('-');
        const dayKey = `${day}_${month}_${year}`;
        r[dayKey] = r[dayKey] || { date: logEntry.created_at, logs: [] };
        r[dayKey].logs.push(logEntry);
        return r;
    }, {}));


    prepareSummary.forEach((logSummary: { date: string; logs: Log[] }) => {
        let avg_response_time = 0

        logSummary.logs.forEach((log: Log) => {
            if (log.response_time) {
                avg_response_time += Number(log.response_time.replaceAll('s', ''));
            }
        });

        let status = ""
        if (logSummary.logs.length === 0) {
            status = "unknown"
        } else if (logSummary.logs.every((item) => item.status === 'success')) {
            status = Status.OPERATIONAL
        } else if (logSummary.logs.every((item) => item.status === 'failed')) {
            status = Status.OUTAGE
        } else {
            status = Status.PARTIAL_OUTAGE
        }

        logDaySummary.push({
            avg_response_time: avg_response_time / logSummary.logs.length,
            current_status: logSummary.logs[logSummary.logs.length - 1].status,
            date: logSummary.date.slice(0, 10),
            status: status
        })
    })


    return fillData(logDaySummary);
}

function fillData(data: LogDaySummary[]): LogDaySummary[] {
    const logDaySummary: LogDaySummary[] = [];
    const today = new Date();

    for (let i = -1; i < 89; i += 1) {
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        const summary = data.find((item) => item.date === d.toISOString().slice(0, 10));
        logDaySummary.push({
            avg_response_time: summary?.avg_response_time || 0,
            current_status: summary?.current_status || "unknown",
            date: d.toISOString().slice(0, 10),
            status: summary?.status || "unknown"
        })
    }

    return logDaySummary.reverse();
}


export default useServices;
