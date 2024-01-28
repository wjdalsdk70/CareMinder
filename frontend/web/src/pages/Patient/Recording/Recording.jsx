import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import PatientFooter from "src/components/PatientFooter/PatientFooter";
import Logo from "src/assets/logo.svg";
import { PiWaveformBold } from "react-icons/pi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./Recording.css";
import {useRedirectToLogin} from "../../../hooks/useSession";
import data from "../../../data.json"


const CustomWaveformIcon = ({ size, volume }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    {/* Your custom waveform SVG code here */}
    <circle cx="12" cy="12" r={4 + volume} fill="#000" />
  </svg>
);

export default function Recording({session}) {
    useRedirectToLogin(session, "/patient/login");
    const patient = data.patient
  const navigate = useNavigate();
  const { transcript } = useSpeechRecognition("");
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256; // Adjust the FFT size as needed

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const lerp = (a, b, t) => (1 - t) * a + t * b;

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const amplitude = Math.max(...dataArray);

          // Adjust these factors for desired behavior
          const smoothingFactor = 0.003; // Smaller values for slower increase
          const decayFactor = 0.95; // Larger values for faster decrease
          const threshold = 50; // Adjust the threshold for sensitivity

          setVolume((prevVolume) => {
            // Calculate the interpolation factor based on amplitude and threshold
            const t = Math.min(
              1,
              Math.max(0, (amplitude - threshold) / (255 - threshold))
            );

            // Use linear interpolation for smoother transition
            const updatedVolume = lerp(
              prevVolume,
              amplitude,
              smoothingFactor * t
            );

            // If amplitude is below the threshold, decrease the dot size faster
            return updatedVolume * (amplitude > threshold ? 1 : decayFactor);
          });

          requestAnimationFrame(updateVolume);
        };
        setIsRecording(true);
        updateVolume();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });

    SpeechRecognition.startListening({ continuous: true, language: "ko" });
    console.log("Speech recognition starts");

    return () => {
      setIsRecording(false);
      audioContext.close().catch(console.error);
      SpeechRecognition.stopListening();
      console.log("Speech recognition stops");
    };
  }, []);

  const handleHomeClick = () => {
    SpeechRecognition.stopListening();
    navigate("/patient/home");
    setIsRecording(false);
  };

  const handleFinishClick = () => {
    SpeechRecognition.stopListening();
    console.log("Finish recording");
    localStorage.setItem("recordingResult", transcript);
    navigate("/patient/recordingresults");
    // navigate("/patient/recordingresults", { state: { transcript } });
    setIsRecording(false);
  };

  return (
    <div className="recording">
      <div className="header">
        <div className="left">
          <img className="patient-img" src={Logo} alt="Patient Logo" />
          <div className="home">
            <a href="/patient/home">
              <FaArrowLeft size={50} color="black" />
            </a>
          </div>
        </div>
      </div>
      <div className="body">
        {isRecording ? (
          <div className="visualizer">
            {/* Use the custom SVG component for flexible size control */}
            <CustomWaveformIcon size={200} volume={volume} />
          </div>
        ) : (
          <PiWaveformBold size={200} />
        )}
      </div>
      <h2 className="record-text">{patient.patientRecordingRecordYourVoice}</h2>
      <div className="record-buttons">
        <a className="record-button" href="/patient/home">
            {patient.patientRecordingCancelButton}
        </a>

        <a
          className="record-button"
          href="/patient/recordingresults"
          onClick={handleFinishClick}
        >
            {patient.patientRecordingFinishButton}
        </a>
      </div>
      <PatientFooter session={session}/>
    </div>
  );
}
