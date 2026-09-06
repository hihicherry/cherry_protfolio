import Heart from "./Heart";

function PageHearts({ hearts, onRemove }) {
	return hearts.map((heart) => (
		<Heart
			key={heart.id}
			x={heart.x}
			y={heart.y}
			targetX={heart.targetX}
			targetY={heart.targetY}
			rotation={heart.rotation}
			color={heart.color}
			isFirework={heart.isFirework}
			onRemove={() => onRemove(heart.id)}
		/>
	));
}

export default PageHearts;
