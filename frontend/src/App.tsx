import InvoicePane from "./pages/InvoicePane";
import PreviewPane from "./pages/PreviewPane";

function App() {
	return (
		<>
			<div className='flex flex-col md:flex-row gap-6 w-full'>
				<div className='md:w-1/2'>
					{/* Your InvoicePane (Form) */}
					<InvoicePane />
				</div>
				<div className='md:w-1/2 border rounded-lg p-4 shadow-sm'>
					<PreviewPane />
				</div>
			</div>
		</>
	);
}

export default App;
