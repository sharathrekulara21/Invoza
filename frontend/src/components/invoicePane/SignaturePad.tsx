import React, { use, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useInvoiceStore } from "@/store/invoiceStore";
import { FontPicker } from "@/utils/FontPicker";
import { CircleX } from "lucide-react";

const fonts = [
	{ label: "Dancing Script", value: "'Dancing Script', cursive" },
	{ label: "Pacifico", value: "'Pacifico', cursive" },
	{ label: "Satisfy", value: "'Satisfy', cursive" },
	{ label: "Great Vibes", value: "'Great Vibes', cursive" },
];

interface SignaturePadProps {
	setFieldsEnabled: React.Dispatch<
		React.SetStateAction<{ showSignaturePad: boolean }>
	>;
}

export default function SignaturePad({ setFieldsEnabled }: SignaturePadProps) {
	const sigRef = useRef<SignatureCanvas>(null);
	let finalSignature = "";
	const [mode, setMode] = useState<"draw" | "upload" | "type">("draw");
	const [penColor, setPenColor] = useState<"black" | "red" | "green">("black");
	const [typedSignature, setTypedSignature] = useState("");
	const [typedFont, setTypedFont] = useState<string | null>("");
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);
	const [selected, setSelected] = useState<string>("bg-black");
	const colors = ["bg-black", "bg-green-500", "bg-red-500"];
	const [fileName, setFileName] = useState<string | null>("");
	const { invoice, setInvoice } = useInvoiceStore();
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileName(file.name);
			const reader = new FileReader();
			reader.onloadend = () => setUploadedImage(reader.result as string);
			reader.readAsDataURL(file);
		}
	};
	const clear = () => {
		finalSignature = "";
		setTypedSignature("");
		setTypedFont("Dancing Script");
		setFileName("");
		if (sigRef.current) {
			sigRef.current.clear();
		}
		setInvoice({
			...invoice,
			signature: finalSignature,
			signatureImg: "",
			signatureFont: "Dancing Script",
		});
	};
	const save = () => {
		if (mode === "draw" && sigRef.current) {
			finalSignature = sigRef.current.toDataURL();
		} else if (mode === "upload" && uploadedImage) {
			finalSignature = uploadedImage;
		} else if (mode === "type" && typedSignature) {
			setInvoice({
				...invoice,
				signature: typedSignature,
				signatureImg: "",
				signatureFont: typedFont,
			});
		}
		if (finalSignature) {
			setInvoice({
				...invoice,
				signatureImg: finalSignature,
				signature: "",
			});
		}
		setFieldsEnabled((prev) => ({ ...prev, showSignaturePad: false }));
	};

	return (
		<div>
			<div className='flex justify-between'>
				<h2 className='font-semibold'>Add your signature</h2>
				<CircleX
					className='cursor-pointer'
					onClick={() =>
						setFieldsEnabled((v) => ({ ...v, showSignaturePad: false }))
					}
				/>
			</div>

			<div className='flex space-x-4 my-3'>
				<div
					className='border p-3 rounded-sm items-center font-semibold justify-center border-gray-900 hover:text-violet-400 text-gray-600 text-sm flex cursor-pointer hover:border-violet-400 transition-colors duration-300'
					onClick={() => setMode("draw")}
				>
					<h3>Draw</h3>
				</div>
				<div
					className='border p-3 rounded-sm items-center font-semibold border-gray-900 text-gray-600 text-sm hover:text-violet-400 justify-center flex cursor-pointer hover:border-violet-400 transition-colors duration-300'
					onClick={() => setMode("type")}
				>
					<h3>Type</h3>
				</div>
				<div
					className='border p-3 rounded-sm font-semibold items-center justify-center border-gray-900 hover:text-violet-400 text-gray-600 text-sm flex cursor-pointer hover:border-violet-400 transition-colors duration-300'
					onClick={() => setMode("upload")}
				>
					<h3>Upload image</h3>
				</div>
			</div>
			<div className='border rounded-sm p-3 mb-2'>
				{mode === "draw" && (
					<>
						<SignatureCanvas
							penColor={penColor}
							canvasProps={{ className: "border rounded-sm w-[100%] h-50" }}
							ref={sigRef}
						/>
						<div className='flex space-x-2 mt-3 px-3'>
							{colors.map((color) => (
								<div
									key={color}
									className={`w-5 h-5 rounded-full cursor-pointer flex items-center justify-center ${color} hover:border-violet-500 hover:border-1`}
									onClick={() => {
										setSelected(color);
										setPenColor(
											color === "bg-green-500"
												? "green"
												: color === "bg-red-500"
												? "red"
												: "black"
										);
									}}
								>
									{selected === color && (
										<span className='text-white font-bold text-sm'>
											&#10003;
										</span>
									)}
								</div>
							))}
						</div>
					</>
				)}

				{mode === "upload" && (
					<>
						<div className='flex items-center mb-2'>
							<button
								className='border p-3 rounded-l-sm items-center font-semibold border-gray-900 text-gray-600 text-sm hover:text-violet-400 justify-center flex cursor-pointer hover:border-violet-400 transition-colors duration-300'
								onClick={() => {
									hiddenFileInput.current?.click();
								}}
							>
								Choose File
							</button>
							<span className=' bg-gray-700 p-3 min-w-40 border border-gray-700 text-sm text-white rounded-r'>
								{fileName?.length > 0 ? fileName : "No File chosen"}
							</span>
						</div>

						<input
							type='file'
							id='fileInput'
							ref={hiddenFileInput}
							accept='image/*'
							style={{ display: "none" }}
							onChange={handleFileChange}
						/>
					</>
				)}

				{mode === "type" && (
					<div>
						<div className='flex space-x-4 items-center'>
							<input
								type='text'
								placeholder='Type your signature'
								value={typedSignature}
								onChange={(e) => setTypedSignature(e.target.value)}
								style={{
									fontFamily: typedFont || "Dancing Script",
									fontSize: 32,
									height: "12.5rem",
									width: "100%",
									padding: "8px 0",
									overflow: "visible",
									textAlign: "center",
									outline: "none",
								}}
								className='border border-gray-900 rounded-sm'
							/>
						</div>
					</div>
				)}
				<div className='flex space-x-4 mt-3 items-center justify-between'>
					{mode === "type" && (
						<div className='no-scrollbar'>
							{/* <FontPicker typedFont={typedFont} setTypedFont={setTypedFont} /> */}
							<select
								value={typedFont || ""}
								onChange={(e) => setTypedFont(e.target.value)}
								className='border-gray-900 cursor-pointer border rounded px-3 py-2 w-full focus:outline-none scrollbar-none'
							>
								{fonts.map((font) => (
									<option
										key={font.label}
										value={font.value}
										style={{ fontFamily: font.value }}
									>
										{font.label}
									</option>
								))}
							</select>
						</div>
					)}
					<button
						onClick={clear}
						className='border border-gray-900 px-3 py-2 rounded-sm items-center font-semibold text-gray-600 text-sm hover:text-violet-400 justify-center flex cursor-pointer hover:border-violet-400 transition-colors duration-300'
					>
						Clear
					</button>
					<button
						onClick={save}
						className='border border-gray-900 px-3 py-2 rounded-sm items-center font-semibold text-gray-600 text-sm hover:text-violet-400 justify-center flex cursor-pointer hover:border-violet-400 transition-colors duration-300'
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
