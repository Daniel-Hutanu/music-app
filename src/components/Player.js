import React from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

export default function Player(props) {
  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }
        return temp;
      });
    }
  };
  return (
    <>
      <div className="phone-mockup">
        <div className="screen-bar">
          <div className="screen-bar-speaker"></div>
          <div className="screen-bar-camera"></div>
        </div>
        <div className="c-player">
          <h4>{props.songs[props.currentSongIndex].title}</h4>
          <PlayerDetails song={props.songs[props.currentSongIndex]} />
          <PlayerControls
            url={props.songs[props.currentSongIndex].src}
            SkipSong={SkipSong}
          />
          <p className="next-song">
            Urmeaza: {props.songs[props.nextSongIndex].artist} -{" "}
            {props.songs[props.nextSongIndex].title}
          </p>
          <svg
            width="316"
            height="242"
            viewBox="0 0 316 242"
            fill="none"
            className="decor-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_6_358)">
              <path
                d="M115.314 246.999C140.368 273.355 203.611 265.088 177.255 290.142C150.899 315.197 88.3402 315.401 63.2858 289.046C38.2313 262.69 62.1631 200.294 88.5189 175.24C114.875 150.185 90.2591 220.643 115.314 246.999Z"
                fill="#5E46F8"
              />
            </g>
            <g filter="url(#filter1_f_6_358)">
              <path
                d="M276.775 233.906C301.829 260.261 266.592 273.234 240.236 298.289C213.881 323.343 211.156 283.672 186.102 257.316C161.047 230.96 97.6997 234.53 124.055 209.476C150.411 184.421 251.72 207.55 276.775 233.906Z"
                fill="#C03EFE"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_6_358"
                x="-116.885"
                y="0.34903"
                width="470.033"
                height="478.115"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="84.7951"
                  result="effect1_foregroundBlur_6_358"
                />
              </filter>
              <filter
                id="filter1_f_6_358"
                x="-51.8299"
                y="29.1313"
                width="506.772"
                height="446.718"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="84.7951"
                  result="effect1_foregroundBlur_6_358"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="phone-line"></div>
        <div className="phone-btn phone-btn-1"></div>
        <div className="phone-btn phone-btn-2"></div>
        <div className="phone-btn phone-btn-3"></div>
      </div>
    </>
  );
}
