"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// import style from "./page.module.css";
import { redirect } from "next/navigation";
import { Player, PlayerState } from "@/components/player";
import { SpotifyPlayerState } from "./spotify_player_state";
import { getSpotifyFetch } from "@/utils/getSpotifyFetch";
import { SpotifyArtist } from "./spotify_artist";

export default function App() {
  const [playerState, setPlayerState] = useState<SpotifyPlayerState | null>(
    null
  );
  const [artistImage, setArtistImage] = useState<string>("");
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });
  /// @ts-ignore
  const spotifyFetch = getSpotifyFetch(session.accessToken);
  // const togglePlayPause = () => {
  //   playerState &&
  //     setPlayerState({ ...playerState, is_playing: !playerState.is_playing });
  // };
  useEffect(() => {
    const timer = setInterval(async () => {
      const response = await spotifyFetch(
        "https://api.spotify.com/v1/me/player"
      );
      if (response.ok) {
        const json = await response.json();
        setPlayerState(json);
      } else if (response.status === 401){
        redirect("/api/auth/signin");
      }
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    (async function () {
      if (!playerState) {
        return;
      }
      const response = await spotifyFetch(playerState.item.artists[0]?.href);
      if (!response.ok) {
        return;
      }
      const artist = await response.json() as SpotifyArtist;
      setArtistImage(artist.images.find((img) => img.height === 640)?.url??"")
    })();
  }, [playerState?.item.artists[0]?.href]);
  if (!playerState) {
    return null;
  }
  const state: PlayerState = {
    isPlaying: playerState.is_playing,
    track: {
      title: playerState.item.name,
    },
    artist: {
      title: playerState.item.artists.map((artist) => artist.name).join(", "),
      image: artistImage,
    },
    album: {
      cover:
        playerState.item.album.images.find((img) => img.height === 640)?.url ??
        "",
      title: playerState.item.album.name,
    },
  };
  return <Player playerState={state} />;
}
