import { memo } from "react";
import Image from "next/image";
import { Lato } from "next/font/google";
import { PlayerControls } from "./controls";

import vinyl from "../../../public/vinyl.png";
import arm from "../../../public/turntable-png-17.png";

import style from "./player.module.css";


const lato = Lato({
  subsets: ["latin"],
  weight: "100",
  style: "normal",
});

export type PlayerState = {
  isPlaying: boolean;
  deviceId: string;
  track: {
    title: string;
  };
  album: {
    cover: string;
    title: string;
  };
  artist: {
    title: string;
    image: string;
  }
};
type PlayerProps = {
  playerState: PlayerState;
};

function PlayerComponent({ playerState }: PlayerProps) {
  return (
    <div>
      <div>
        <img
          src={playerState.artist.image}
          className={style.artistImage}
        />
      </div>
      <PlayerControls
          isPlaying={playerState.isPlaying}
          deviceId={playerState.deviceId}
        />
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
              className={`${style.artistName} ${lato.className}`}
            >
              {playerState.artist.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Player = memo(PlayerComponent);

// playerState.item.album.images.find((img) => img.height === 640)?.url
// playerState.item.name
/* {playerState.item.artists.map((artist) => artist.name).join(", ")} */
