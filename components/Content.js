import Image from 'next/image'
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { useRecoilValue } from "recoil";
import { HiChevronDown } from "react-icons/hi";
import { shuffle } from "lodash"
import { PlaylistIdState } from '../atoms/playlistAtom';

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
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(PlaylistIdState); // Read only version
  // const [playlistId, setPlaylistId] = useRecoilState(PlaylistIdState);

  useEffect(() => {
    // shuffle array of colors and choose one color 
    setColor(shuffle(colors).pop());
  }, [playlistId])

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
        <Image className="rounded-full w-10 h-10"
            src={session?.user.image}
            width={30}
            height={30}
            layout="fixed"
            alt="Logo" />
          <h2>{session?.user.name}</h2>
          <HiChevronDown className="h-6 w-6" />
        </div>
      </header>
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 tex-white p-8`}>
      </section>
    </div>
  );
}
