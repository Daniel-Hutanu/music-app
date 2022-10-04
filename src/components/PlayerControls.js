import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import WaveSurfer from "wavesurfer.js";
import { ReactComponent as FullVolumeIcon } from "../assets/svg/full.svg";
import { ReactComponent as SemiVolumeIcon } from "../assets/svg/semi.svg";
import { ReactComponent as MuteVolumeIcon } from "../assets/svg/mute.svg";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "rgba(255, 255, 255, 0.75)",
  progressColor: "#7B57E4",
  cursorColor: "#7B57E4",
  barWidth: 3,
  barGap: 2,
  barRadius: 4,
  responsive: true,
  height: 48,
  normalize: true,
  partialRender: true,
  hideScrollbar: true
});

export default function PlayerControls(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    setPlay(false);
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(props.url);

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });
    return () => wavesurfer.current.destroy();
  }, [props.url]);
  if (playing) {
    wavesurfer.current.on("finish", () => {
      props.SkipSong(true);
    });
  }
  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };
  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;
    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
      if (newVolume < 0.1) {
        setIcon("mute");
        wavesurfer.current.setVolume(0);
      } else if (newVolume < 0.5) {
        setIcon("semi");
      } else {
        setIcon("full");
      }
    }
  };
  const [icon, setIcon] = useState("full");
  const changeIcons = (bool) => {
    if (bool) {
      setIcon("mute");
      document.getElementById("volume").value = 0;
      wavesurfer.current.setVolume(0);
    } else {
      setIcon("full");
      document.getElementById("volume").value = 1;
      wavesurfer.current.setVolume(1);
    }
  };
  return (
    <>
      <div id="waveform" ref={waveformRef} />
      <div className="c-player--controls">
        <button className="skip-btn" onClick={() => props.SkipSong(false)}>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7144 1.86398C13.7143 1.66018 13.6583 1.46029 13.5523 1.2862C13.4463 1.11211 13.2944 0.970509 13.1134 0.876893C12.9323 0.783277 12.7289 0.741248 12.5256 0.755405C12.3222 0.769562 12.1266 0.839359 11.9603 0.95716L4.17923 6.47256C4.03469 6.57474 3.91665 6.70996 3.83494 6.86695C3.75322 7.02395 3.71019 7.19818 3.70943 7.37516C3.70867 7.55214 3.7502 7.72674 3.83056 7.88443C3.91092 8.04213 4.02779 8.17835 4.17145 8.28177L11.9525 13.8794C12.1185 13.9991 12.3143 14.0707 12.5184 14.0862C12.7225 14.1017 12.9269 14.0606 13.1091 13.9674C13.2913 13.8742 13.4442 13.7325 13.551 13.558C13.6578 13.3834 13.7143 13.1828 13.7144 12.9781V1.86398ZM0.375406 1.30611C0.375406 1.15874 0.433963 1.01741 0.538194 0.913205C0.642424 0.809 0.783792 0.750458 0.931196 0.750458C1.0786 0.750458 1.21997 0.809 1.3242 0.913205C1.42843 1.01741 1.48699 1.15874 1.48699 1.30611V13.5305C1.48699 13.6778 1.42843 13.8192 1.3242 13.9234C1.21997 14.0276 1.0786 14.0861 0.931196 14.0861C0.783792 14.0861 0.642424 14.0276 0.538194 13.9234C0.433963 13.8192 0.375406 13.6778 0.375406 13.5305V1.30611Z"
              fill="#BAA8ED"
            />
          </svg>
        </button>
        <button className="play-btn" id="play-btn" onClick={handlePlayPause}>
          {playing ? (
            <svg
              width="15"
              height="22"
              viewBox="0 0 15 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="2.28266"
                y1="0.538147"
                x2="2.28266"
                y2="21.5996"
                stroke="white"
                stroke-width="4.2123"
              />
              <line
                x1="12.1113"
                y1="0.538116"
                x2="12.1113"
                y2="21.5996"
                stroke="white"
                stroke-width="4.2123"
              />
            </svg>
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <button
          className="skip-btn"
          onClick={() => {
            props.SkipSong();
          }}
        >
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.381348 1.86398C0.381355 1.66018 0.437424 1.46029 0.543421 1.2862C0.649419 1.11211 0.801262 0.970509 0.982344 0.876893C1.16343 0.783277 1.36677 0.741248 1.57014 0.755405C1.77351 0.769562 1.96906 0.839359 2.13542 0.95716L9.91647 6.47256C10.061 6.57474 10.1791 6.70996 10.2608 6.86695C10.3425 7.02395 10.3855 7.19818 10.3863 7.37516C10.387 7.55214 10.3455 7.72674 10.2651 7.88443C10.1848 8.04213 10.0679 8.17835 9.92425 8.28177L2.1432 13.8794C1.9772 13.9991 1.78137 14.0707 1.57729 14.0862C1.37321 14.1017 1.1688 14.0606 0.986595 13.9674C0.804389 13.8742 0.651461 13.7325 0.544665 13.558C0.43787 13.3834 0.381354 13.1828 0.381348 12.9781V1.86398ZM13.7203 1.30611C13.7203 1.15874 13.6617 1.01741 13.5575 0.913205C13.4533 0.809 13.3119 0.750458 13.1645 0.750458C13.0171 0.750458 12.8757 0.809 12.7715 0.913205C12.6673 1.01741 12.6087 1.15874 12.6087 1.30611V13.5305C12.6087 13.6778 12.6673 13.8192 12.7715 13.9234C12.8757 14.0276 13.0171 14.0861 13.1645 14.0861C13.3119 14.0861 13.4533 14.0276 13.5575 13.9234C13.6617 13.8192 13.7203 13.6778 13.7203 13.5305V1.30611Z"
              fill="#BAA8ED"
            />
          </svg>
        </button>
        <button className="volume-set">
          <input
            type="range"
            id="volume"
            orient="vertical"
            name="volume"
            min="0.01"
            max="1"
            step=".025"
            onChange={onVolumeChange}
            defaultValue={volume}
          />
          <div id="volume-icon">
            <div>
              {icon === "full" && (
                <FullVolumeIcon onClick={() => changeIcons(true)} />
              )}
              {icon === "semi" && <SemiVolumeIcon />}
              {icon === "mute" && (
                <MuteVolumeIcon onClick={() => changeIcons(false)} />
              )}
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
