"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// import style from "./page.module.css";
import { redirect } from "next/navigation";
import { Player, PlayerState } from "@/components/player";
import { SpotifyPlayerState } from "./spotify_player_state";

export default function App() {
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(
    null
  );
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  const togglePlayPause = () => {
    playerState &&
      setPlayerState({ ...playerState, is_playing: !playerState.is_playing });
  };
  useEffect(() => {
    const timer = setInterval(async () => {
      /// @ts-ignore
      const token = session.accessToken;
      if (!!token) {
        const response = await fetch("https://api.spotify.com/v1/me/player", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "same-origin",
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
  if (!playerState) {
    return null;
  }
  const state: PlayerState = {
    isPlaying: playerState.is_playing,
    track : {
      artist: playerState.item.artists.map((artist) => artist.name).join(", "),
      title: playerState.item.name
    },
    album: {
      cover: playerState.item.album.images.find((img) => img.height === 640)?.url??"",
      title: playerState.item.album.name
    }
  };
  return <Player playerState={state} />;
}
