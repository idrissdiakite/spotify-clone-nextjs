import {
  HiHome,
  HiSearch,
  HiOutlineMenuAlt1,
  HiOutlinePlus,
  HiHeart,
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { playlistIdState } from "../atoms/playlistAtom";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";

export default function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  // thx to useRecoilState we can use playlistId globally - see atoms/playlistAtom.js
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  // when we click on a playlist, we store his id in playlistId
  // console.log("Playlist id: ", playlistId);

  useEffect(() => {
    // if aceessToken is set
    if (spotifyApi.getAccessToken()) {
      // console.log(spotifyApi)
      spotifyApi.getUserPlaylists().then((data) => {
        // console.log(data)
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);


  // const getFavTracks = () => {
  //   spotifyApi
  //       .getMySavedTracks({limit: 50})
  //       .then((data) => {
  //         setFavTracks(data.body);
  //         console.log(favTracks)
  //       })
  //       .catch((err) => console.log("Something went wrong", err));
  // };

  return (
    <div className="hidden md:inline text-gray-400 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen min-w-[12rem] lg:min-w-[14rem]hidden pb-36">
      <div className="space-y-3">
        <button className="flex items-center space-x-2 hover:text-white">
          <HiHome className="h-6 w-6" />
          <p>Accueil</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiSearch className="h-6 w-6" />
          <p>Rechercher</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiOutlineMenuAlt1 className="h-6 w-6" />
          <p>Bibliothèque</p>
        </button>
      </div>
      <div className="space-y-3">
        <button className="flex items-center space-x-2 hover:text-white mt-8">
          <HiOutlinePlus className="h-6 w-6" />
          <p>Créer une playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HiHeart className="h-6 w-6" />
          <p>Titres likés</p>
        </button>
      </div>

      <hr className="border-t-[0.1px] border-gray-400 mt-5 mb-5" />

      {/* Playlists */}
      <div className="space-y-3">
      {playlists.map((playlist) => (
        <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="hover:text-white cursor-pointer">{playlist.name}</p>
      ))}
      </div>
    </div>
  );
}
