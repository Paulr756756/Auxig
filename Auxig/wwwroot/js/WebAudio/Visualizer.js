var _canvasContext, source, canvas, distortion, panner;


function draw() {
	const WIDTH = canvas.width;
	const HEIGHT = canvas.height;
	const drawVisual = requestAnimationFrame(draw);
	analyser.getByteTimeDomainData(dataArray);
	_canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

	_canvasContext.fillStyle = "rgb(200,200,200)";
	_canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

	_canvasContext.lineWidth = 2;
	_canvasContext.strokeStyle = "rgb(0,0,0)";

	_canvasContext.beginPath();

	const sliceWidth = (WIDTH * 1.0) / bufferLength;
	let x = 0;

	for (let i = 0; i < bufferLength; i++) {
		const v = dataArray[i] / 128.0;
		const y = v * (HEIGHT / 2);

		if (i == 0) {
			_canvasContext.moveTo(x, y);
		} else {
			_canvasContext.lineTo(x, y);
		}

		x += sliceWidth;
	}

	_canvasContext.lineTo(canvas.width, canvas.height/ 2);
	_canvasContext.stroke();
}

function AudioVisualiser() {

	// stream = _audioElement.captureStream();

	// console.log(stream.getAudioTracks().length > 0);
	analyser = _audioContext.createAnalyser();
	// source = _audioContext.createMediaStreamSource(stream);
	// source.connect(analyser);

	panner.connect(analyser);
	distortion = _audioContext.createWaveShaper();

	//Have no idea why to connect these two
	analyser.connect(distortion);
	distortion.connect(_audioContext.destination);

	//creating waveform
	analyser.fftSize = 2048;
	bufferLength = analyser.frequencyBinCount;
	dataArray = new Uint8Array(bufferLength);
	// analyser.getByteTimeDomainData(dataArray);

	//canvas
	canvas = document.querySelector("canvas");
	_canvasContext = canvas.getContext("2d");

	// _canvasContext.fillStyle= 'green';	

	draw();
}