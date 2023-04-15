import { useEffect, useState } from "react";

interface Props {
	src: string;
}

function SVG({ src }: Props) {
	const [svgCode, setSvgCode] = useState<string | null>(null);

	const newSrc = "/assets/images/discussRiskResult/icons" + src;

	useEffect(() => {
		async function fetchSvg() {
			const response = await fetch(newSrc);
			const svg = await response.text();
			setSvgCode(svg);
		}
		fetchSvg();
	}, [src]);

	return <div dangerouslySetInnerHTML={{ __html: svgCode ?? "" }} />;
}

export default SVG;
