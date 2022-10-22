import useSpotify from "../hooks/useSpotify";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/trackAtom";

export default function Player() {

  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  return (
    <div>
    {/* Cover */}
      <div>

      </div>
    </div>
  )
}
