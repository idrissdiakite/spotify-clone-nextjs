import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { HiChevronDown } from "react-icons/hi";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Tracks from "./Tracks";

const colors = [
  "from-blue-500",
  "from-indigo-500",
  "from-green-500",
  "from-yellow-500",
  "from-purple-500",
  "from-pink-500",
  "from-red-500",
];

export default function Content() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  // const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const playlistId = useRecoilValue(playlistIdState); // Read only version
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    // shuffle array of colors and choose one color
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
        // console.log(data.body)
      })
      .catch((err) => console.log("Something went wrong", err));
    }
  }, [session, spotifyApi, playlistId, setPlaylist]);

  console.log(playlist)

  return (
    <div className="flex-grow text-s lg:text-sm">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <Image
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            width={30}
            height={30}
            layout="fixed"
            alt="Logo"
          />
          <h2>{session?.user.name}</h2>
          <HiChevronDown className="h-6 w-6" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8`}
      >
      <div className="lg:w-25">
        <Image
            className="w-44 h-44"
            src={playlist?.images?.[0]?.url}
            width={200}
            height={200}
            layout="fixed"
            priority
            alt="Logo"
          />
      </div>
          <div className="text-white">
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
            <p className="text-xs md:text-base">{playlist?.description}</p>
          </div>
      </section>
    </div>
  );
}
