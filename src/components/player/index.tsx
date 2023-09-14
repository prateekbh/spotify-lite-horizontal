import { memo } from "react";
import Image from "next/image";
import { Fira_Sans_Condensed } from "next/font/google";
import { PlayerControls } from "./controls";

import vinyl from "../../../public/vinyl.png";
import arm from "../../../public/turntable-png-17.png";

import style from "./player.module.css";


const firaSansCondensed = Fira_Sans_Condensed({
  subsets: ["latin"],
  weight: "100",
  style: "normal",
});

export type PlayerState = {
  isPlaying: boolean;
  track: {
    title: string;
    artist: string;
  };
  album: {
    cover: string;
    title: string;
  };
};
type PlayerProps = {
  playerState: PlayerState;
};

function PlayerComponent({ playerState }: PlayerProps) {
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
                !!playerState.isPlaying ? "" : style.paused
              }`}
              alt="turn table arm"
              src={arm}
              width={200}
              height={200}
            />
            <img
              src={playerState.album.cover}
              className={`${style.albumart} ${
                playerState.isPlaying ? style.playing : ""
              }`}
              width={200}
              height={200}
            />
          </div>
          <div className={style.trackInfo}>
            <div className={style.trackName}>{playerState.track.title}</div>
            <div
              className={`${style.artistName} ${firaSansCondensed.className}`}
            >
              {playerState.track.artist}
            </div>
          </div>
        </div>
        <PlayerControls
          isPlaying={playerState.isPlaying}
        />
      </div>
    </div>
  );
}

export const Player = memo(PlayerComponent);

// playerState.item.album.images.find((img) => img.height === 640)?.url
// playerState.item.name
/* {playerState.item.artists.map((artist) => artist.name).join(", ")} */
