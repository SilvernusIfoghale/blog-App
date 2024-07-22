import "./posts.css";
import Post from "../post/Post";
function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}

export default Posts;
