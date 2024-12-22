import { ColorsProvider } from "@context/colors-context"
import { PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const AllTheProviders = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<ColorsProvider>
				{children}
			</ColorsProvider>
		</QueryClientProvider>
	)
}
export default AllTheProviders;