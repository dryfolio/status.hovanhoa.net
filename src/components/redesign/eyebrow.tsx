import type { ReactNode } from 'react';

// Eyebrow — uppercase mono section label.
export function Eyebrow({ children }: { children: ReactNode }) {
	return <div className="rd-eyebrow">{children}</div>;
}

export default Eyebrow;
