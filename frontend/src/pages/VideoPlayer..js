// src/components/VideoPlayer.jsx

import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="100%"
        style={{ maxHeight: '400px' }} // Adjust height as needed
      />
    </div>
  );
};

export default VideoPlayer;
