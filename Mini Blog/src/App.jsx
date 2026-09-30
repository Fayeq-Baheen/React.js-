import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

const posts = [
  {
    id: 1,
    title: "Learning React",
    author: "Fayeq",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: 2,
    title: "Learning JavaScript",
    author: "Fayeq",
    content: "JavaScript is a powerful programming language.",
  },
  {
    id: 3,
    title: "Learning CSS",
    author: "Fayeq",
    content: "CSS is used to style web pages.",
  },
];

function Header() {
  return (
    <nav>
      <Link to="/posts">Posts</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

function Posts() {
  return (
    <div className="page">
      <h1>My Blog</h1>

      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h2>{post.title}</h2>
          <p>By {post.author}</p>

          <Link to={`/posts/${post.id}`}>
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}

function PostDetails({ likes, onLike }) {
  const { id } = useParams();

  const post = posts.find(
    (post) => post.id === Number(id)
  );

  return (
    <div className="page">
      <h1>{post.title}</h1>

      <p>By {post.author}</p>

      <p>{post.content}</p>

      <p>❤️ {likes} Likes</p>

      <button onClick={onLike}>Like</button>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h1>About</h1>
      <p>This is my small React blog.</p>
    </div>
  );
}

export default function App() {
  const [likes, setLikes] = useState({});

  function handleLike(id) {
    setLikes({
      ...likes,
      [id]: (likes[id] || 0) + 1,
    });
  }

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/posts" element={<Posts />} />

        <Route
          path="/posts/:id"
          element={
            <PostDetails
              likes={likes[window.location.pathname.split("/").pop()] || 0}
              onLike={() =>
                handleLike(
                  Number(
                    window.location.pathname
                      .split("/")
                      .pop()
                  )
                )
              }
            />
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}