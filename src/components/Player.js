import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RiPlayLine,
  RiPauseFill,
  RiSkipBackLine,
  RiSkipForwardLine,
  RiShuffleFill,
} from "react-icons/ri";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetCurrentTime,
  SetisPlaying,
} from "../redux/songsSlice";
import {
  IoVolumeHighSharp,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

const Player = () => {
  const {
    currentSong,
    allSongs,
    currentSongIndex,
    isPlaying,
    currentTime,
    selectedPlaylist,
  } = useSelector((state) => state.songs);
  // const [isPlaying, setPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(0.5);
  // const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();
  const dispatch = useDispatch();

  const maxTime = currentSong
    ? Number(currentSong?.duration.split(":")[0]) * 60 +
      Number(currentSong?.duration.split(":")[1])
    : 0;

  const [shuffle, setShuffle] = useState(false);

  const onNext = () => {
    let index = currentSongIndex + 1;
    index %= selectedPlaylist.songs.length;
    if (shuffle) {
      const random = Math.floor(Math.random() * selectedPlaylist?.songs.length);
      index = random;
    }
    console.log(index);

    dispatch(SetCurrentSongIndex(index));
    dispatch(SetCurrentSong(selectedPlaylist.songs[index]));
  };
  const onPrev = () => {
    let index =
      currentSongIndex > 0
        ? currentSongIndex - 1
        : selectedPlaylist.songs.length - 1;
    if (shuffle) {
      const random = Math.floor(Math.random() * selectedPlaylist?.songs.length);
      index = random;
    }
    console.log(index);
    dispatch(SetCurrentSongIndex(index));
    dispatch(SetCurrentSong(selectedPlaylist.songs[index]));
  };
  const onPause = () => {
    dispatch(SetisPlaying(false));
    audioRef.current.pause();
  };

  const onPlay = () => {
    dispatch(SetisPlaying(true));
    audioRef.current.play();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentTime) audioRef.current.currentTime = currentTime;
  }, []);

  return (
    <Fragment>
      {currentSong && (
        <div className="bg-gray-100 absolute bottom-0 left-0 right-0 p-5 shadow-lg border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* <img className="h-20 w-24"></img> */}
              <div className="w-96">
                <h1>{currentSong?.title}</h1>
                <h1>
                  {currentSong?.artist}, {currentSong?.album},{" "}
                  {currentSong?.year}
                </h1>
              </div>
            </div>
            <div className="w-96 flex flex-col items-center">
              <audio
                src={currentSong?.src}
                ref={audioRef}
                onTimeUpdate={(e) =>
                  dispatch(SetCurrentTime(e.target.currentTime))
                }
                onEnded={() => dispatch(SetisPlaying(false))}
              />
              <div className="flex items-center gap-2 w-full">
                <h1>
                  {Math.floor(currentTime / 60)}:{parseInt(currentTime % 60)}
                </h1>
                <input
                  type="range"
                  className="p-0 w-full"
                  value={currentTime}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    dispatch(SetCurrentTime(e.target.value));
                  }}
                  min={0}
                  max={maxTime}
                />
                <h1>{currentSong?.duration}</h1>
              </div>
              <div className="flex gap-10 item-center">
                <RiShuffleFill
                  className={`text-3xl pt-1 ${
                    shuffle && "text-green-500  font-bold"
                  }`}
                  onClick={() => setShuffle(!shuffle)}
                />
                <div className="flex items-center gap-3">
                  <RiSkipBackLine className="text-4xl" onClick={onPrev} />
                  {isPlaying ? (
                    <RiPauseFill onClick={onPause} className="text-4xl" />
                  ) : (
                    <RiPlayLine onClick={onPlay} className="text-4xl" />
                  )}
                  <RiSkipForwardLine className="text-4xl" onClick={onNext} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IoVolumeMute
                onClick={() => {
                  audioRef.current.volume = 0;
                  setCurrentVolume(0);
                }}
                className="text-2xl"
              />
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                onChange={(e) => {
                  audioRef.current.volume = e.target.value;
                  setCurrentVolume(e.target.value);
                }}
                value={currentVolume}
                className="p-0"
              />
              {(currentVolume < 0.4) & (currentVolume > 0) ? (
                <IoVolumeLow className="text-2xl" />
              ) : (currentVolume === 0) | (currentVolume < 0.7) ? (
                <IoVolumeMedium
                  className="text-2xl"
                  onClick={() => {
                    if (currentVolume === 0) {
                      audioRef.current.volume = 0.5;
                      setCurrentVolume(0.5);
                    }
                  }}
                />
              ) : (
                <IoVolumeHighSharp className="text-2xl" />
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Player;
