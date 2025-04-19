import type React from 'react'

type WindWidgetProps = {
	degrees: number
	speedKnots: number
	gustKnots: number
}

const degreesToCompass = (deg: number): string => {
	const directions = [
		'N',
		'NNE',
		'NE',
		'ENE',
		'E',
		'ESE',
		'SE',
		'SSE',
		'S',
		'SSW',
		'SW',
		'WSW',
		'W',
		'WNW',
		'NW',
		'NNW',
	]
	const index = Math.round(deg / 22.5) % 16

	const label = directions[index]
	if (!label) {
		throw Error(`Invalid degreesToCompass index: ${index}`)
	}
	return label
}

export const WindWidget: React.FC<WindWidgetProps> = ({
	degrees,
	speedKnots,
	gustKnots,
}) => {
	const compass = degreesToCompass(degrees)
	const rotation = degrees + 180 // so arrow points to where wind is going

	return (
		<div className="max-w-[150px] max-h-[130px] rounded-xl shadow-md p-3 bg-zinc-800 text-zinc-100">
			<h2 className="text-xl font-semibold mb-1">Wind Conditions</h2>
			<div className="flex items-center gap-6">
				{/* Wind Direction */}
				<div className="flex flex-col items-center justify-center w-12">
					<div style={{ transform: `rotate(${rotation}deg)` }}>
						<svg
							className="w-8 h-8 text-blue-400"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<title>Wind Direction</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 2v20m0 0l4-4m-4 4l-4-4"
							/>
						</svg>
					</div>
					<span className="mt-0.5">{degrees}</span>
					<span>{compass}</span>
				</div>

				{/* Wind Info */}
				<div className="flex-1 flex-col flex justify-between">
					<div className=" text-zinc-300">
						<div>Speed</div>
						<div className="text-base font-bold text-white">
							{speedKnots} <span className=" font-normal">kt</span>
						</div>
					</div>
					<div className=" text-zinc-300">
						<div>Gusts</div>
						<div className="text-base font-semibold text-white">
							{gustKnots} <span className=" font-normal">kt</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
