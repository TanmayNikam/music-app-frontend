import React from "react";
import MusicLoader from "../music_loader.svg";

export const Loader = () => {
  return (
    <div className="absolute inset-0 bg-white z-50 flex items-center justify-center">
      <div className="h-60 w-60 animate-pulse">
        <img src={MusicLoader} alt="Music Loader" />
      </div>
    </div>
  );
};
