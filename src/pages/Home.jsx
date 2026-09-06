import MainCard from "../components/MainCard";
import NavBar from "../components/NavBar";
import PageHearts from "../components/PageHearts";
import PageParticles from "../components/PageParticles";
import { usePageEffects } from "../hooks/usePageEffects";

function Home() {
	const { hearts, removeHeart } = usePageEffects();

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-2 xs:p-3 sm:p-4 relative overflow-auto">
			<PageParticles />

			<MainCard />

			<NavBar className="fade-in-delayed" />
			<PageHearts hearts={hearts} onRemove={removeHeart} />
		</div>
	);
}

export default Home;
