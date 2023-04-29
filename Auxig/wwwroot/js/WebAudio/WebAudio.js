var _audioContext, track, _audioElement, playButton, gainNode;
var input, analyser, dataArray, bufferLength, stream;
var tabList;
window.interopFunctions = {
	InitializeApi: function () {
		if (_audioContext == null) {
			_audioContext = new AudioContext();
			_audioElement = document.querySelector("#audioElement");
			
			// input = document.querySelector("input");
			// console.log('initialized input');
			// input.addEventListener('change', this.ChangeHandler);


			track = _audioContext.createMediaElementSource(_audioElement);

			tabList = document.querySelector("#tabList");
			tabList.addEventListener(
				"change",
				() => {
					AudioVisualiser();
				}
			)
			
			// stream =_audioContext.create
			//Initializing event listeners
			this.PlaySound();
			this.PauseSound();
			VolumeControl();
			PanController();
			AudioVisualiser();
			ChangeHandler();
			InitializeFilters();

		}

		// 	// Check if context is in suspended state (autoplay policy)
		// 	// if (_audioContext.state === "suspended") _audioContext.resume();

		// 	// if(_audioContext.state == "running") _audioContext.suspend();

		// 	console.log(_audioContext.state);

		
	},

	PlaySound: function () {
		playButton = document.querySelector("#playButton");
		playButton.dataset.playing = "false";

		playButton.addEventListener(
			"click",
			() => {
				// Play track depending on state
				if (playButton.dataset.playing === "false") {
					_audioElement.play();
					playButton.dataset.playing = "true";
					// console.log(playButton.dataset.playing);
				}
			},
			false
		);

	},

	PauseSound: function () {
		const pauseButton = document.querySelector("#pauseButton");

		pauseButton.addEventListener(
			"click",
			() => {
				//  Pause track depending on state
				if (playButton.dataset.playing === "true") {
					_audioElement.pause();
					playButton.dataset.playing = "false";
					//console.log(playButton.dataset.playing);
				}
			},
			false
		);

	}
}

function VolumeControl() {
	gainNode = _audioContext.createGain();
		track.connect(gainNode);
		// const value = document.querySelector("#outVal");
		const volumeControl = document.querySelector("#volumeControl");
		// value.textContent = volumeControl.value;

		volumeControl.addEventListener(
			"input",
			() => {
				gainNode.gain.value = volumeControl.value;
			},
			false
		);

		// volumeControl.addEventListener("input", (event) => {
		// 	value.textContent = event.target.value;
		// })
}

function ChangeHandler() {
	
	input = document.querySelector("#audioPicker");
	input.addEventListener(
		"change",
		() => {
			const curFiles = input.files;
			const file = curFiles[0];
			console.log("change handler");
			
			// _audioElement = null;
			// // _audioElement = document.createElement("audio");

			// _audioElement = new Audio(URL.createObjectURL(file));
			// _audioContext = new AudioContext();

			_audioElement.src = URL.createObjectURL(file);


			// track = _audioContext.createMediaElementSource(_audioElement);

			// //for the visualiser 
			// drawVisual = null;
			// sliceWidth=null;
			// stream=null, source=null,distortion=null;
			// source = null;
			AudioVisualiser();
		}
	)
}

function PanController() {
	const pannerOptions = { pan: 0 };
		panner = new StereoPannerNode(_audioContext, pannerOptions);
		gainNode.connect(panner);

		const pannerControl = document.querySelector("#pannerControl");

		pannerControl.addEventListener(
			"input",
			() => {
				panner.pan.value = pannerControl.value;
			},
			false
		);
}