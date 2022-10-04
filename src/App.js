import { useState, useEffect } from "react";
import Player from "./components/Player";
import "./assets/css/main.css";

export default function App() {
  const [songs] = useState([
    {
      title: "Asta-i politică",
      artist: "Chimie",
      img_src: "./images/chimie.jpg",
      src: "./music/asta-i-politica.mp3",
    },
    {
      title: "Tessellata 32",
      artist: "Phunk B",
      img_src: "./images/phunkb.jpg",
      src: "./music/tessellata-32.mp3",
    },
    {
      title: "Șaișpe linii",
      artist: "Cedry2k & Pietonu",
      img_src: "./images/cedry2k.jpg",
      src: "./music/saispe-linii.mp3",
    },
    {
      title: "Societate",
      artist: "Pacha Man",
      img_src: "./images/pacha-man.webp",
      src: "./music/societate.mp3",
    },
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);
  return (
    <div className="App">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div>
  );
}
