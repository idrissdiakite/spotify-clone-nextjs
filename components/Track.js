import Image from "next/image";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

// get order and track from components/tracks
export default function Song({ order, track }) {
  const spotifyApi = useSpotify();
  console.log(track);

  return (
    <div className="grid grid-cols-2">
      <div className="flex items-center space-x-4">
        <p className="mr-4">{order + 1}</p>
        <Image
          className="w-10 h-10"
          src={track?.album?.images[0].url}
          width={80}
          height={80}
          layout="fixed"
          alt=""
        />
        <div>
          <p>{track.artists[0].name}</p>
          <p>{track.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}
