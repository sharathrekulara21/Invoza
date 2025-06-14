import InvoicePane from "./components/InvoicePane";
import PreviewPane from "./components/PreviewPane";

function App() {
	return (
		<>
			<div className='flex flex-col md:flex-row gap-6 w-full'>
				<div className='md:w-1/2'>
					{/* Your InvoicePane (Form) */}
					<InvoicePane />
				</div>
				<div className='md:w-1/2 border rounded-lg p-4 shadow-sm bg-green-900'>
					<PreviewPane />
				</div>
			</div>
		</>
	);
}

export default App;
