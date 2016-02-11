import React from 'react';
import { Link } from 'react-router';

function sortByDate(a, b) {
  if(a.publicationDate < b.publicationDate) return 1;
  if(a.publicationDate > b.publicationDate) return -1;
  return 0;
}

// returns five newest posts
function filterPosts(posts) {
  posts = posts.sort(sortByDate);
  return posts.slice(0, 5);
}

const Post = (post) => {
  return (
    <li key={post.id} className="DashboardBox-Item">
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  );
}

export default class NewsFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: filterPosts(props.posts)
    };
  }

  render() {
    const posts = this.state ? this.state.posts : this.props.posts;

    return (
      <div className="NewsFeed DashboardBox">
        <h3 className="DashboardBox-Header">News Feed</h3>
        <ul className="DashboardBox-List">
        {
          posts.map((post) => {
            return Post(post);
          })
        }
        </ul>
      </div>
    );
  }
}
