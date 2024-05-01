import SigninUsers from "components/auth/SignInUsers";
import ConnectToLinkBtn from "components/buttons/ConnectToLinkBtn";

function LoginPage() {
	return (
		<div className="min-h-[100vh]  bg-fade bg-no-repeat bg-cover bg-center flex justify-center items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
			<div className="w-[400px] text-center">
				<div>
					<ConnectToLinkBtn
						text="Go to dashboard"
						href="/dashboard/home"
					></ConnectToLinkBtn>
				</div>
				<SigninUsers></SigninUsers>
			</div>
		</div>
	);
}

export default LoginPage;
