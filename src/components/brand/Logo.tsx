import Image from "next/image";

function LogoBg(props) {
	return <Image src={`/images/main_web/brand/logo_w_bg.png`} {...props} />;
}

function Logo(props) {
	return <Image src={`/images/main_web/brand/logo.png`} {...props} />;
}

export { LogoBg, Logo };
