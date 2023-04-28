

function InitializeFilters() {
	const feedForward = [0.00020298, 0.0004059599, 0.00020298];
	const feedBackward = [1.0126964558, -1.9991880801, 0.9873035442];
	const filterSwitch = document.querySelector("#filterSwitch");
	const iirfilter = _audioContext.createIIRFilter(feedForward, feedBackward);
	track.connect(_audioContext.destination);

	filterSwitch.addEventListener(
		"change",
		() => {
			if (filterSwitch.dataset.filteron === "false") {
				distortion.disconnect(_audioContext.destination);
				distortion.connect(iirfilter).connect(_audioContext.destination);
				filterSwitch.dataset.filteron = true;
			}
		},
		false
	);


}
