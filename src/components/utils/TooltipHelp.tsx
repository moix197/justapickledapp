import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { BasicButton } from "components/buttons/Basic";

function TooltipHelp({ children = null, text, className = "", type = null }) {
	return (
		<div>
			<div
				className={`tooltip tooltip-left ${className} text-secondary before:absolute before:bg-gray-900 before:p-4 before:border before:border-fourth before:w-[250px] before:tracking-wider`}
				data-tip={text}
			>
				{type == "button" ? (
					<BasicButton className="!p-2 !pl-1 !pr-1 sm:!pl-2 sm:!pl-2 sm:!pr-2 sm:pr border-yellow-600 hover:bg-gray-900">
						<ExclamationCircleIcon className="w-6  h-6 text-yellow-600 sm:w-8 sm:h-8"></ExclamationCircleIcon>
					</BasicButton>
				) : (
					<ExclamationCircleIcon className="w-8 h-8 text-yellow-600 cursor-pointer"></ExclamationCircleIcon>
				)}
			</div>
		</div>
	);
}

export default TooltipHelp;
