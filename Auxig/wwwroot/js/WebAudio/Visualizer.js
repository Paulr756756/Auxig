var _canvasContext, source, canvas, distortion, panner;

let drawVisual;


function AudioVisualiser() {
	if (_audioContext == null) return;
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

	//canvas
	canvas = document.querySelector("canvas");
	_canvasContext = canvas.getContext("2d");


	

	const WIDTH = canvas.width;
	const HEIGHT = canvas.height;

	const visualSetting = tabList.dataset.tabname;
	console.log(visualSetting);
	

	if (visualSetting == "Oscillator") {
		//creating waveform
		analyser.fftSize = 2048;
		bufferLength = analyser.frequencyBinCount;
		dataArray = new Uint8Array(bufferLength);
		// analyser.getByteTimeDomainData(dataArray);

		_canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

		const draw = function () {

			drawVisual = requestAnimationFrame(draw);

			analyser.getByteTimeDomainData(dataArray);


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

			_canvasContext.lineTo(canvas.width, canvas.height / 2);
			_canvasContext.stroke();

		};
		draw();
	} else if(visualSetting == "Bargraph"){
		
		analyser.fftSize = 256;
      const bufferLengthAlt = analyser.frequencyBinCount;
      console.log(bufferLengthAlt);

      // See comment above for Float32Array()
      const dataArrayAlt = new Uint8Array(bufferLengthAlt);

      _canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

      const drawAlt = function () {
        drawVisual = requestAnimationFrame(drawAlt);

        analyser.getByteFrequencyData(dataArrayAlt);

        _canvasContext.fillStyle = "rgb(0, 0, 0)";
        _canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLengthAlt) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLengthAlt; i++) {
          barHeight = dataArrayAlt[i];

          _canvasContext.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          _canvasContext.fillRect(
            x,
            HEIGHT - barHeight / 2,
            barWidth,
            barHeight / 2
          );

          x += barWidth + 1;
        }
      };

      drawAlt();
	}

	
}