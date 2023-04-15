import HeaderMenu from "../components/header";
import FooterLinks from "../components/footer";
import { HomeProps } from "../types";

interface LayoutProps {
	children: React.ReactNode;
	data: HomeProps["data"];
}

export default function Layout({ children, data }: LayoutProps) {
	return (
		<div>
			<HeaderMenu nav={data.navigationNodes} />
			<main>{children}</main>
			<FooterLinks data={data} />
		</div>
	);
}


