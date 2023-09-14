"use client";
import pauseIcon from "../../../../public/pause.png";
import playIcon from "../../../../public/play.png";
import previousIcon from "../../../../public/previous.png";
import nextIcon from "../../../../public/next.png";
import style from "./controls.module.css";
import { useSession } from "next-auth/react";
import { getSpotifyFetch } from "@/utils/getSpotifyFetch";
import { redirect } from "next/navigation";

type ControlProps = {
  isPlaying: boolean;
  deviceId: string;
};

export function PlayerControls({ isPlaying, deviceId }: ControlProps) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  /// @ts-ignore
  const token = session.accessToken;
  if (!token) {
    location.href="/api/auth/signin";
  }
  const spotifyFetch = getSpotifyFetch(token);
  const controlsAction = async (action:'pause'|'play'|'next'|'previous') => {
    const method = (action==='play' || action === 'pause') ?  'PUT' : 'POST';
    await spotifyFetch(`/me/player/${action}`, {
      method,
      body: JSON.stringify({
        device_id: deviceId
      })
    })
  }
  const togglePlayPause = async () => {
    const action = isPlaying ? "pause": "play";
    await controlsAction(action);
  };
  const playNext = async () => {
    await controlsAction("next");
  };
  const playPrevious = async () => {
    await controlsAction("previous");
  };
  return (
    <div className={style.controls}>
      <button className={style.prev} onClick={playPrevious}>
        <img src={previousIcon.src} width="60%" height="60%" />
      </button>
      <button className={style.playpause} onClick={togglePlayPause}>
        <img
          src={isPlaying ? pauseIcon.src : playIcon.src}
          width="60%"
          height="60%"
        />
      </button>
      <button className={style.next} onClick={playNext}>
        <img src={nextIcon.src} width="60%" height="60%" />
      </button>
    </div>
  );
}
