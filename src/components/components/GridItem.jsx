import global from "../../resources/global.json";

export default function GridItem({ children, backgroundColor, ...props }) {
	return (
		<div
			className="box-shadow"
			style={{
				backgroundColor: backgroundColor,
				width: "95%",
				borderRadius: "15px",
				boxShadow: "10px black",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: "40px",
				overflow: "hidden",
				position: "relative",
				...props,
			}}
		>
			{children}
		</div>
	);
}
