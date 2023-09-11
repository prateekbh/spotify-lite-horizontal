"use client";
import { useEffect, useState } from "react";
import { dummyResponse } from "./dummyResponse";
import { Fira_Sans_Condensed } from "next/font/google";
import Image from "next/image";

import pauseIcon from "../../../public/pause.png";
import playIcon from "../../../public/play.png";
import previousIcon from "../../../public/previous.png";
import nextIcon from "../../../public/next.png";
import vinyl from "../../../public/vinyl.png";

import style from "./page.module.css";

const firaSansCondensed = Fira_Sans_Condensed({
  subsets: ["latin"],
  weight: "100",
  style: "normal",
});

export default function Player() {
  const [playerState, setPlayerState] = useState(dummyResponse);
  useEffect(() => {
    const timer = setInterval(() => {});
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <div>
        <img
          src="https://i.scdn.co/image/ab67618600001016290e69da72d0ea68cd91c24d"
          className={style.artistImage}
        />
      </div>
      <div className={style.dock}>
        <div className={style.info}>
          <div className={style.thumbnail}>
            <Image className={style.vinyl} alt="vinyl record" src={vinyl} width={200} height={200} />
            <img
              src={
                playerState.item.album.images.find((img) => img.height === 640)
                  ?.url
              }
              className={style.albumart}
              width={200}
              height={200}
            />
          </div>
          <div className={style.trackInfo}>
            <div className={style.trackName}>{playerState.item.name}</div>
            <div
              className={`${style.artistName} ${firaSansCondensed.className}`}
            >
              {playerState.item.artists.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        </div>
        <div className={style.controls}>
          <button className={style.prev}>
            <img src={previousIcon.src} width="60%" height="60%" />
          </button>
          <button className={style.playpause}>
            <img
              src={playerState.is_playing ? pauseIcon.src : playIcon.src}
              width="60%"
              height="60%"
            />
          </button>
          <button className={style.next}>
            <img src={nextIcon.src} width="60%" height="60%" />
          </button>
        </div>
      </div>
    </div>
  );
}
