import Image from "next/image";

function BirdEyeLogo({ className = null, width = 35, height = 35 }) {
	return (
		<Image
			height={height}
			width={width}
			className={className}
			src={`/images/main_web/rss_logos/birdeye.png`}
			alt="birdEye Logo"
		></Image>
	);
}

function SolanaFmLogo({ className = null, width = 35, height = 35 }) {
	return (
		<Image
			width={width}
			height={height}
			className={className}
			src={`/images/main_web/rss_logos/solanafm.png`}
			alt="SolanaFM Logo"
		></Image>
	);
}

export { BirdEyeLogo, SolanaFmLogo };
