import './content.css'
import { WindWidget } from '@components/widgets/wind'

export function Content() {
	return (
		<div className=" border border-zinc-700 p-4 rounded-lg shadow-lg ">
			<WindWidget degrees={280} speedKnots={10} gustKnots={15} />
		</div>
	)
}
