import Image from "next/image";
import useSpotify from "../hooks/useSpotify";
import useTrackInfo from "../hooks/useTrackInfo";
import { useEffect, useState } from "react";
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

  const track = useTrackInfo();
  const cover = track?.album.images?.[0]?.url;
  console.log("Track id: ", track);

  const fetchCurrentTrack = () => {
    if (!track) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentTrack();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div>
      {/* Cover */}
      {/* Show player only if track is defined */}
      <div className={track ? "flex items-center space-x-5 bg-gradient-to-b from-black to-gray-900 h-35 p-5 text-white" : ""}>
        <Image
          className="hidden md:inline w-10 h-10"
          src={cover}
          width={60}
          height={60}
          layout="fixed"
          alt=""
        />
        <div>
          <h3>{track?.name}</h3>
          <p>{track?.artists?.[0]?.name}</p>
        </div>
      </div>
    </div>
  );
}
