import { FunctionComponent } from 'react';
import { Status } from '../../../utils/constants';
import LogDaySummary from '../../types/LogDaySummary';
import Service from "../../types/Service";
import ServiceLog from "../log";
import StatusIcon from "../icons/StatusIcon";

interface ServiceItemProps {
    item: Service
}

const ServiceItem: FunctionComponent<ServiceItemProps> = ({ item }) => {
    const calculateUpTime = () => {
        const successCount = item.logs.filter((logEntry) => logEntry.status === Status.OPERATIONAL).length;
        return Math.round((successCount * 100) / 90);
    }

    return (
        <div className='mb-10'>
            <div className='flex'>
                <StatusIcon status={item?.status} size="sm" />
                <div className="w-full flex justify-between items-baseline">
                    <p className="ml-4 text-base font-semibold leading-6 text-gray-900">{item.name}</p>
                    <p className='text-xs text-gray-400 items-baseline self-baseline'> {calculateUpTime()}% operational in last 90 days</p>
                </div>

            </div>
            <div className='flex mt-2'>
                {
                    ((item.logs || []) as LogDaySummary[]).map((log) => (
                        <ServiceLog key={log.date} item={log} />
                    ))
                }
            </div>

        </div>
    )
}

export default ServiceItem;