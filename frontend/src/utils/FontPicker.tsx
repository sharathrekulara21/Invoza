import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

const fonts = [
	{ label: "Dancing Script", value: "'Dancing Script', cursive" },
	{ label: "Pacifico", value: "'Pacifico', cursive" },
	{ label: "Satisfy", value: "'Satisfy', cursive" },
	{ label: "Great Vibes", value: "'Great Vibes', cursive" },
];

export function FontPicker({ typedFont, setTypedFont }) {
	const selectedFont = fonts.find((f) => f.value === typedFont);

	return (
		<Select value={typedFont} onValueChange={setTypedFont}>
			<SelectTrigger className='w-45 border rounded-sm border-gray-900'>
				<SelectValue style={{ fontFamily: selectedFont?.label }} />
			</SelectTrigger>
			<SelectContent defaultValue={"Dancing Script"}>
				{fonts.map((font) => (
					<SelectItem
						key={font.label}
						value={font.value}
						style={{ fontFamily: font.value }}
					>
						{font.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
