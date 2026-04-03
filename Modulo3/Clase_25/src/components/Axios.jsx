import React, { useEffect, useState } from "react";
import axios from "axios";

export const Axios = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Lista de Posts</h1>
      <ul>
        {posts.map((post) => (
          <li
            style={{
              backgroundColor: "tomato",
              margin: "1rem",
              padding: "10px",
              color: "white",
            }}
            key={post.id}
          >
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
