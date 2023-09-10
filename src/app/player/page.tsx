"use client";
import { useEffect, useState } from "react"
import { dummyResponse } from "./dummyResponse";

import pauseIcon from "../../../public/pause.png";

import style from "./page.module.css"

export default function Player() {
    const [playerState, setPlayerState] = useState(dummyResponse);
    useEffect(() => {
        const timer = setInterval(() => {

        });
        return () => {
            clearInterval(timer);
        }
    }, [])
    return (<div>
        <div>
            <img src="https://i.scdn.co/image/ab67618600001016290e69da72d0ea68cd91c24d" className={style.artistImage} />
        </div>
        <div className={style.dock}>
            <img src={playerState.item.album.images.find(img => img.height === 640)?.url} className={style.albumart} width={200} height={200} />
            <div className={style.controls}>
                <button className={style.prev}></button>
                <button className={style.playpause}><img src={pauseIcon.src} width="100%" height="100%"/></button>
                <button className={style.next}></button>
            </div>
        </div>
    </div>);
}