import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../redux/songsSlice";

const SongsList = () => {
  const { allSongs, currentSong, selectedPlaylist } = useSelector(
    (state) => state.songs
  );
  const [searchKey, setSearchKey] = useState("");
  const [songsToPlay, setSongsToPlay] = useState(
    selectedPlaylist ? selectedPlaylist.songs : allSongs
  );

  useEffect(() => {
    setSongsToPlay(selectedPlaylist?.songs);
  }, [selectedPlaylist]);

  useEffect(() => {
    if (selectedPlaylist && searchKey !== "") {
      const tempSongs = selectedPlaylist?.songs.filter(
        (s) =>
          s.title.toLowerCase().includes(searchKey.toLowerCase()) ||
          s.artist.toLowerCase().includes(searchKey.toLowerCase()) ||
          s.album.toLowerCase().includes(searchKey.toLowerCase())
      );
      setSongsToPlay(tempSongs);
    } else {
      setSongsToPlay(selectedPlaylist?.songs);
    }
  }, [searchKey]);

  const dispatch = useDispatch();
  return (
    <Fragment>
      {allSongs && (
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Song, Artist, Album"
            className="p-3 rounded"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <div className="pr-3 overflow-y-auto h-[55vh]">
            {songsToPlay?.map((song, index) => {
              const isPlaying = currentSong
                ? song._id === currentSong._id
                : false;
              return (
                <div
                  className={`flex items-center justify-between cursor-pointer p-2 ${
                    isPlaying && "shadow border border-gray-300"
                  }`}
                  onClick={() => {
                    dispatch(SetCurrentSong(song));
                    dispatch(SetCurrentSongIndex(index));
                  }}
                  key={song._id}
                >
                  <div>
                    <h1>{song.title}</h1>
                    <h1>
                      {song.artist}, {song.album}, {song.year}
                    </h1>
                  </div>
                  <div>
                    <h1>{song.duration}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SongsList;
