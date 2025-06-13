"use client";

import { format } from "date-fns";
import { useInvoiceStore } from "@/store/invoiceStore";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePickers({
	label,
	dateKey,
}: {
	label: string;
	dateKey: "issueDate" | "dueDate";
}) {
	const { invoice, setInvoice } = useInvoiceStore();
	const selectedDate = invoice[dateKey]
		? new Date(invoice[dateKey])
		: undefined;
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-[240px]  pl-3 bg-gray-300 text-left font-normal hover:bg-gray-400",
						!selectedDate && "text-muted-foreground"
					)}
				>
					{selectedDate ? (
						format(selectedDate, "PPP")
					) : (
						<span>Pick a date</span>
					)}
					<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto bg-gray-200 p-0' align='start'>
				<Calendar
					mode='single'
					selected={selectedDate}
					onSelect={(date) =>
						date && setInvoice({ [dateKey]: date.toISOString() })
					}
					captionLayout='dropdown'
					classNames={{
						day: "rounded-md border border-transparent text-gray-900 hover:bg-gray-200",
						selected: "bg-violet-400 text-white hover:bg-violet-300",
						today: "border border-gray-400 bg-violet-200",
						disabled: "text-gray-400 pointer-events-none",
						outside: "text-gray-400 opacity-50", // container for dropdown
						dropdown_root:
							"relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-1 rounded-md",
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}
