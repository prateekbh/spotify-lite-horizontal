"use client";
import { useEffect, useState } from "react";
import { dummyResponse } from "./player/dummyResponse";
import { Fira_Sans_Condensed } from "next/font/google";
import { useSession } from "next-auth/react"
import Image from "next/image";

import pauseIcon from "../../public/pause.png";
import playIcon from "../../public/play.png";
import previousIcon from "../../public/previous.png";
import nextIcon from "../../public/next.png";
import vinyl from "../../public/vinyl.png";
import arm from "../../public/turntable-png-17.png";

import style from "./page.module.css";
import { PageProps } from "../../.next/types/app/page";
import { redirect } from "next/navigation";

const firaSansCondensed = Fira_Sans_Condensed({
  subsets: ["latin"],
  weight: "100",
  style: "normal",
});

export default function Player({}: PageProps) {
  const [playerState, setPlayerState] = useState(dummyResponse);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/signin");  
    },
  });
  const togglePlayPause = () => {
    setPlayerState({ ...playerState, is_playing: !playerState.is_playing });
  };
  useEffect(() => {
    const timer = setInterval(async () => {
      /// @ts-ignore
      const token = session.accessToken
      if (!!token) {
        const response = await fetch("https://api.spotify.com/v1/me/player", {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          credentials: "same-origin"
        });
        if (response.ok) {
          const json = await response.json();  
          setPlayerState(json);
        }
      }
    }, 2000);
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
            <Image
              className={style.vinyl}
              alt="vinyl record"
              src={vinyl}
              width={200}
              height={200}
            />
            <Image
              className={`${style.arm} ${
                !!playerState.is_playing ? "" : style.paused
              }`}
              alt="turn table arm"
              src={arm}
              width={200}
              height={200}
            />
            <img
              src={
                playerState.item.album.images.find((img) => img.height === 640)
                  ?.url
              }
              className={`${style.albumart} ${
                playerState.is_playing ? style.playing : ""
              }`}
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
          <button className={style.playpause} onClick={togglePlayPause}>
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
