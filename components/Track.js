import Image from "next/image";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

// get order and track from components/tracks
export default function Song({ order, track }) {
  const spotifyApi = useSpotify();
  console.log(track);

  return (
    <div className="grid grid-cols-2 text-gray-400 hover:text-white hover:bg-gray-900 py-4 px-5 cursor-pointer">
      <div className="flex items-center space-x-4">
        <p className="mr-4">{order + 1}</p>
        <Image
          className="w-10 h-10"
          src={track?.album?.images[0].url}
          width={50}
          height={50}
          layout="fixed"
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.name}</p>
          <p className="">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline">{track.album.name}</p>
        <p className="text-gray-400">{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}
