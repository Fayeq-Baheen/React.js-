import { useState } from "react";

const songs = [
    { id: 1, title: "Ay Saraban", artist: "Saraban", likes: 100, liked: false },
    {
    id: 2,
    title: "Hafta Ba Hafta",
    artist: "Javad Naseri",
    likes: 162,
    liked: false,
  },
  {
    id: 3,
    title: "Naz Kon",
    artist: "Kianoosh Rahimi",
    likes: 257,
    liked: false,
},
];

let index = 0;

export default function App() {
  const [title, setTitle] = useState(songs[0].title);
  const [artist, setArtist] = useState(songs[0].artist);
  const [likes, setLikes] = useState(songs[0].likes);
  const [liked, setLiked] = useState(songs[0].liked);

  function handleNextSong() {
    index++;
    if (index >= songs.length) {
      index = 0;
    }
    
    const nextSong = songs[index];
    setTitle(nextSong.title);
    setArtist(nextSong.artist);
    setLikes(nextSong.likes);
    setLiked(nextSong.liked);
  }

  function handlePrevSong() {
    index--;
    if (index < 0) {
      index = songs.length - 1;
    }
    const prevSong = songs[index];
    setTitle(prevSong.title);
    setArtist(prevSong.artist);
    setLikes(prevSong.likes);
    setLiked(prevSong.liked);
  }
  
  function handleLike() {
    if (!liked) {
      setLikes(likes+1);
      setLiked(true);
    }else{
        setLikes(likes-1);
        setLiked(false);
    }
  }

//   funct

  return (
    <div className="text-center mt-30 rounded-4xl bg-slate-800 w-100 m-auto shadow-2xl shadow-slate-600">
      <h1 className="text-2xl font-bold p-6 pb-10 text-slate-300">
        <button className="mr-10 text-cyan-200 text-3xl cursor-pointer" onClick={handlePrevSong}>
          &lt;((
        </button>
        {title}
        <button className="ml-10 text-cyan-200 text-3xl cursor-pointer" onClick={handleNextSong}>
          ))&gt;
        </button>
      </h1>
      <div className="flex justify-between text-2xl font-bold p-8 bg-slate-700 text-slate-300 w-100 m-auto shadow-2xl shadow-slate-600">
        <h2>{artist}</h2>
        <span>
          {likes}{" "}
          {liked ? (
            <button className="cursor-pointer" onClick={handleLike}>
              ❤️
            </button>
          ) : (
            <button className="cursor-pointer" onClick={handleLike}>
              🖤
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
