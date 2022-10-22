import Image from "next/image";
import useSpotify from "../hooks/useSpotify";
import useTrackInfo from "../hooks/useTrackInfo";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/trackAtom";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const trackInfo = useTrackInfo();
  // console.log("Track id: ", trackInfo)

  return (
    <div>
      {/* Cover */}
      <div>
      {/* <Image
            className="rounded-full w-10 h-10"
            src={trackInfo?.album.images?.[0]?.url}
            width={30}
            height={30}
            layout="fixed"
            alt="Logo"
          /> */}
      </div>
    </div>
  );
}
