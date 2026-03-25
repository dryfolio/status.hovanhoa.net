import { Status } from '../../../utils/constants';

interface StatusIconProps {
    status: string;
    size?: 'sm' | 'md';
}

const OperationalIcon = ({ size }: { size: 'sm' | 'md' }) => (
    <svg className={`${size === 'sm' ? 'h-6 w-6' : 'h-8 w-8'} flex-none fill-sky-100 stroke-green-500 stroke-2`}>
        <circle cx="12" cy="12" r="11" />
        <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    </svg>
);

const PartialOutageIcon = () => (
    <svg className="h-8 w-8 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="orange">
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20zm21.72-201.15-5.74 122a16 16 0 0 1-32 0l-5.74-121.94v-.05a21.74 21.74 0 1 1 43.44 0z" />
    </svg>
);

const OutageIcon = () => (
    <svg className="h-8 w-8 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="red">
        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20zm21.72-201.15-5.74 122a16 16 0 0 1-32 0l-5.74-121.94v-.05a21.74 21.74 0 1 1 43.44 0z" />
    </svg>
);

const UnknownIcon = () => (
    <svg className="h-6 w-6 flex-none fill-sky-100 stroke-green-500 stroke-2">
        <circle cx="12" cy="12" r="11" />
        <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    </svg>
);

export default function StatusIcon({ status, size = 'sm' }: StatusIconProps) {
    switch (status) {
        case Status.OPERATIONAL:
            return <OperationalIcon size={size} />;
        case Status.PARTIAL_OUTAGE:
            return <PartialOutageIcon />;
        case Status.OUTAGE:
            return <OutageIcon />;
        default:
            return <UnknownIcon />;
    }
}
