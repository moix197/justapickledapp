import { TitleLg } from "components/dashboard/Titles";
import { useEffect, useState } from "react";
import { checkDateIsAfterToday } from "utils/checkTimePassed";

function EventCountdown({ launchDate }) {
	const [time, setTime] = useState(null);
	const [timeLeft, setTimeLeft] = useState(null);
	const [showCountdown, setShowCountdown] = useState(false);

	useEffect(() => {
		isStillInCountdown();
		if (launchDate) {
			const timer = setInterval(() => {
				setTimeLeft(calculateTimeLeft());
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [launchDate]);

	function isStillInCountdown() {
		let result = checkDateIsAfterToday(launchDate);
		if (result) {
			calculateTimeLeft();
		}
		setShowCountdown(result);
	}

	function calculateTimeLeft() {
		const difference = +new Date(launchDate) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	}

	function formatTime(time) {
		return time < 10 ? `0${time}` : time;
	}

	return (
		<div>
			{showCountdown ? (
				<div>
					<div className="text-center">
						<TitleLg>Live in:</TitleLg>
					</div>
					<div className="grid grid-flow-col gap-5 text-center auto-cols-max text-secondary">
						{timeLeft?.days > 0 && (
							<div className="flex flex-col uppercase">
								<span className="countdown font-mono text-5xl">
									<span
										style={{ "--value": timeLeft?.days } as React.CSSProperties}
									></span>
								</span>
								<span className="text-third text-xs">days</span>
							</div>
						)}
						{timeLeft?.hours > 0 && (
							<div className="flex flex-col uppercase">
								<span className="countdown font-mono text-5xl">
									<span
										style={
											{ "--value": timeLeft?.hours } as React.CSSProperties
										}
									></span>
								</span>
								<span className="text-third text-xs">hours</span>
							</div>
						)}
						{timeLeft?.minutes > 0 && (
							<div className="flex flex-col uppercase">
								<span className="countdown font-mono text-5xl">
									<span
										style={
											{ "--value": timeLeft?.minutes } as React.CSSProperties
										}
									></span>
								</span>
								<span className="text-third text-xs">min</span>
							</div>
						)}
						<div className="flex flex-col uppercase">
							<span className="countdown font-mono text-5xl">
								<span
									style={
										{ "--value": timeLeft?.seconds } as React.CSSProperties
									}
								></span>
							</span>
							<span className="text-third text-xs">sec</span>
						</div>
					</div>
				</div>
			) : (
				<TitleLg>LIVE NOW</TitleLg>
			)}
		</div>
	);
}

export default EventCountdown;
