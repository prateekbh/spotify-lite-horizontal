"use client"
import pauseIcon from "../../../../public/pause.png";
import playIcon from "../../../../public/play.png";
import previousIcon from "../../../../public/previous.png";
import nextIcon from "../../../../public/next.png";
import style from "./controls.module.css";

type ControlProps = {
    isPlaying: boolean;
}

export function PlayerControls({isPlaying}: ControlProps) {
    function togglePlayPause() {
        console.log("Toggling play pause");
    }
    return (
        <div className={style.controls}>
            <button className={style.prev}>
              <img src={previousIcon.src} width="60%" height="60%" />
            </button>
            <button className={style.playpause} onClick={togglePlayPause}>
              <img
                src={isPlaying ? pauseIcon.src : playIcon.src}
                width="60%"
                height="60%"
              />
            </button>
            <button className={style.next}>
              <img src={nextIcon.src} width="60%" height="60%" />
            </button>
          </div>
    )
}