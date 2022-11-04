import Image from "next/image";
import useSpotify from "../hooks/useSpotify";
import useTrackInfo from "../hooks/useTrackInfo";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/trackAtom";
import {
  HiPlay,
  HiPause,
  HiRewind,
  HiFastForward,
  HiVolumeOff,
  HiVolumeUp,
} from "react-icons/hi";
import { debounce } from "lodash";

export default function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const track = useTrackInfo();
  const cover = track?.album.images?.[0]?.url;
  // console.log("Track id: ", track);

  useEffect(() => {
    if (volume >= 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    // https://www.geeksforgeeks.org/lodash-_-debounce-method/
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  // const fetchCurrentTrack = () => {
  //   if (!track) {
  //     spotifyApi.getMyCurrentPlayingTrack().then((data) => {
  //       setCurrentTrackId(data.body?.item?.id);

  //       spotifyApi.getMyCurrentPlaybackState().then((data) => {
  //         setIsPlaying(data.body?.is_playing);
  //       });
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (spotifyApi.getAccessToken() && !currentTrackId) {
  //     fetchCurrentTrack();
  //     setVolume(50);
  //   }
  // }, [currentTrackId, spotifyApi, session]);

  // useEffect(() => {
  //   if (spotifyApi.getAccessToken() && currentTrackId) {
  //     spotifyApi.getMyCurrentPlaybackState().then((data) => {
  //       // console.log(data.body)
  //     setIsPlaying(data.body?.is_playing);
  //     console.log(isPlaying)
  //   });
  // }
  // }, [currentTrackId, isPlaying, spotifyApi]);

  const handleMusicPlay = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  return (
    <div
      className={
        track
          ? "bg-gradient-to-b from-black to-gray-900 h-35 py-3 px-5 grid grid-cols-3 text-xs md:text-base text-white"
          : "hidden"
      }
    >
      {/* LEFT/COVER */}

      {/* Show player only if track is defined */}
      <div className="flex items-center space-x-5">
        <Image
          className="hidden md:inline w-10 h-10"
          src={cover}
          width={60}
          height={60}
          layout="fixed"
          alt=""
        />
        <div>
          <h3 className="">{track?.name}</h3>
          <p className="text-gray-400">{track?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* MIDDLE/PLAY-PAUSE */}
      <div className="flex items-center justify-center space-x-10">
        <HiRewind className="player-icon" />
        {isPlaying ? (
          <HiPause
            onClick={handleMusicPlay}
            className="player-icon w-10 h-10"
          />
        ) : (
          <HiPlay onClick={handleMusicPlay} className="player-icon w-10 h-10" />
        )}
        <HiFastForward className="player-icon" />
      </div>

      {/* RIGHT/VOLUME */}
      <div className="flex items-center justify-end space-x-2 md:space-x-4 pr-5">
        <HiVolumeOff
          onClick={() => setVolume(0)}
          className={volume === 0 ? "text-red-600 player-icon" : "player-icon"}
        />
        <input
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-14 md:w-44 h-1"
          type="range"
          value={volume}
          min={0}
          max={100}
        />
        <HiVolumeUp
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className={volume > 0 ? "text-blue-600 player-icon" : "player-icon"}
        />
      </div>
    </div>
  );
}
