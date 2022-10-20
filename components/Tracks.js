import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Track from "./Track";


export default function Tracks() {
  const playlists = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-1 pb-28 px-8 text-white">
      {playlists?.tracks?.items.map((track, i) => (
        <Track key={track.track.id} track={track.track} order={i} />
      ))}
    </div>
  )
}
