import React, { useEffect, useState } from 'react';
import PlaylistService from '../../api/playlistService';
import PlaylistCard from '../../components/PlaylistCard';

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await PlaylistService.getAllPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Failed to fetch playlists', error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="container">
      <h2>Playlists</h2>
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  );
};

export default PlaylistsPage;
