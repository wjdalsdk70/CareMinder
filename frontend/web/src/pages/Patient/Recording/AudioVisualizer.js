import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ audioStream }) => {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; // Adjust as needed

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');

    analyserRef.current = analyser;

    const source = audioContext.createMediaStreamSource(audioStream);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / analyser.frequencyBinCount) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i];

        canvasContext.fillStyle = `rgb(0,${barHeight + 100},0)`;
        canvasContext.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      audioContext.close();
    };
  }, [audioStream]);

  return <canvas ref={canvasRef} />;
};

export default AudioVisualizer;
