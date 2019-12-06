import React, { Component } from "react";
import "./post.css";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch("/posts")
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>
              {post.title} {post.description}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Posts;
