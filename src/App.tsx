import Startpage from "@pages/Startpage"
import { ColorsProvider } from "@context/colors-context"

function App(): JSX.Element {

	return (
		<ColorsProvider>
			<Startpage />
		</ColorsProvider>
	)
}

export default App