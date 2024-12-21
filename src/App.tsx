import Startpage from "@pages/Startpage"
import { ColorsProvider } from "@context/colors-context"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient();

function App(): JSX.Element {
	return (
		<QueryClientProvider client={queryClient}>
			<ColorsProvider>
				<Startpage />
			</ColorsProvider>
		</QueryClientProvider>
	)
}

export default App