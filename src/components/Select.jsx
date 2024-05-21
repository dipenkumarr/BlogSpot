import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
	const id = useId();

	return (
		<div className="w-full">
			{label && (
				<label htmlFor={id} className="">
					<select
						{...props}
						id={id}
						ref={ref}
						className={`px-3 py-2 rounded-lg outline-none focus:bg-gray-50 duration-150 border border-gray-200 w-full ${className}`}
					>
						{options?.map((eachOption) => (
							<option key={eachOption} value={eachOption}>
								{eachOption}
							</option>
						))}
					</select>
				</label>
			)}
		</div>
	);
}

export default React.forwardRef(Select);
