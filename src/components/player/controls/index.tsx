"use client";
import pauseIcon from "../../../../public/pause.png";
import playIcon from "../../../../public/play.png";
import previousIcon from "../../../../public/previous.png";
import nextIcon from "../../../../public/next.png";
import style from "./controls.module.css";
import { useSession } from "next-auth/react";
import { getSpotifyFetch } from "@/utils/getSpotifyFetch";

type ControlProps = {
  isPlaying: boolean;
  deviceId: string;
};

export function PlayerControls({ isPlaying, deviceId }: ControlProps) {
  const { data: session } = useSession({
    required: true,
  });
  /// @ts-ignore
  const spotifyFetch = getSpotifyFetch(session.accessToken);
  const togglePlayPause = async () => {
    const action = isPlaying ? "pause": "play";
    await spotifyFetch(`/me/player/${action}`, {
      method: 'PUT',
      body: JSON.stringify({
        device_id: deviceId
      })
    })
  };
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
  );
}
