import React from 'react';

const PlaylistCard = ({ playlist, onSelect }) => {
  return (
    <div className="card mb-3" onClick={() => onSelect(playlist.id)}>
      <div className="card-body">
        <h5 className="card-title">{playlist.name}</h5>
        <p className="card-text">
          {playlist.songs.length} songs
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard;
