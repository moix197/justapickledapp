import React from "react";
import Image, { ImageProps } from "next/image";

function LogoBg(props: Omit<ImageProps, "src">) {
	return <Image src={`/images/main_web/brand/logo_w_bg.png`} {...props} />;
}

function Logo(props: Omit<ImageProps, "src">) {
	return <Image src={`/images/main_web/brand/logo.png`} {...props} />;
}

export { LogoBg, Logo };
