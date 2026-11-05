import useServices from './hooks/useServices';
import type { FunctionComponent } from 'react';
import Service from './types/Service';
import ServiceItem from './components/service';

const ServicesSection: FunctionComponent = () => {
	const [data, isServicesLoading] = useServices();
	const services = (data as Service[]) || [];

	return (
		<div className="rounded-[var(--rd-r-lg)] border border-[var(--rd-border)] bg-[var(--rd-surface)]">
			<div className="flex items-center justify-between border-b border-[var(--rd-line)] px-[1.15rem] py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[var(--rd-text-3)]">
				<span>Uptime</span>
				<span className="font-[family-name:var(--font-mono)] normal-case tracking-normal">
					<span className="sm:hidden">last 30 days</span>
					<span className="max-sm:hidden">last 90 days</span>
				</span>
			</div>
			{isServicesLoading ? (
				<p className="m-0 px-[1.15rem] py-6 font-[family-name:var(--font-mono)] text-[0.8rem] text-[var(--rd-text-3)]">
					Loading services…
				</p>
			) : (
				<ul className="m-0 list-none p-0">
					{services.map((service) => (
						<ServiceItem key={service.id} item={service} />
					))}
				</ul>
			)}
		</div>
	);
};

export default ServicesSection;
