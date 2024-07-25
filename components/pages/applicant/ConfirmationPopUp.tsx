type ConfirmationPopupProps = {
	message: string;
	onConfirm: () => void;
};

export function ConfirmationPopup({ message, onConfirm }: ConfirmationPopupProps) {
	return (
		<div className="fixed inset-0 z-50 flex w-full items-center justify-center overflow-y-auto">
			<div className="flex w-full items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 backdrop-blur-sm backdrop-filter transition-opacity"
					aria-hidden="true"
				>
					<div className="absolute inset-0 bg-gray-500 opacity-70"></div>
				</div>

				<div className="inline-block w-3/12 max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
					<div className="w-full max-w-3xl bg-white p-8">
						<div className="items-center sm:flex sm:justify-center">
							<div className="mx-auto mt-4 w-10/12 text-center sm:mt-0 sm:text-left">
								<h3 className="mb-8 text-center text-3xl font-bold leading-6 text-gray-900">
									Confirm Action
								</h3>
								<div className="mt-2 text-center font-semibold text-black">
									<p>{message}</p>

									{/* Yes and No buttons */}
									<div className="mt-8 flex justify-center">
										<button
											type="button"
											onClick={onConfirm}
											className="rounded-md border border-transparent bg-[#5e1e1e] px-4 py-2 text-sm font-medium text-white"
										>
											Back to homepage
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
