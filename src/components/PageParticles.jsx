import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

function PageParticles() {
	const prefersReducedMotion = usePrefersReducedMotion();

	if (prefersReducedMotion) return null;

	return (
		<div className="absolute inset-0 z-0" aria-hidden="true">
			<div className="particle top-10 left-10"></div>
			<div className="particle top-20 left-1/4"></div>
			<div className="particle top-30 left-1/2"></div>
			<div className="particle top-40 left-3/4"></div>
			<div className="particle top-50 right-10"></div>
		</div>
	);
}

export default PageParticles;
