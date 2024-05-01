import AppBar from "components/AppBar";

function Layout({ children }) {
	return (
		<div>
			<AppBar title="Pickle sales" />
			<div className="w-full p-4 flex justify-center bg-fade bg-no-repeat bg-cover bg-center w-full min-h-[calc(100vh-69px)] ">
				<div className="w-[800px]">{children}</div>
			</div>
		</div>
	);
}

export default Layout;
