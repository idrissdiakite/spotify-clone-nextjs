// custom hook for component/Player

import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import useSpotify from "./useSpotify";
import { currentTrackIdState } from "../atoms/trackAtom";

export default function useTrackInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            }
          }
        ).then(res => res.json());
        setTrackInfo(trackInfo);
      }
    };
    fetchTrackInfo();
  }, [currentTrackId, spotifyApi]);

  return trackInfo;
}
