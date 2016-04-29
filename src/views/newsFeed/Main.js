import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/lib/paper';
import NewsFeedPost from 'components/newsFeed/newsFeedPost';
import newsFeedActions from 'actions/newsFeed';
import AddPostModal from 'components/newsFeed/modals/addPostModal';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import falcorModel from '../../falcorModel.js';
import API from 'utils/API';
import falcorUtils from 'utils/falcorUtils';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    newsFeed: bindActionCreators(newsFeedActions, dispatch)
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeletePost = this.onDeletePost.bind(this);
  }

  async onSubmit(post) {
      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'September',
        'October',
        'November',
        'December'
      ];
      let user = this.props.session.user;
      let author = `${user.firstName} ${user.lastName}`;
      let date = new Date();
      let prettyDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      let newPost = {
        title: post.title,
        message: post.message,
        date: prettyDate,
        authorName: author
      }

      console.log('\n#################\nCALL API: ADD NEWS\n#################\n');

      let response = await falcorModel
        .call(
              ['restaurants', localStorage.restaurantID, 'news','add'],
              [newPost]
            ).
        then((result) => {
          return falcorModel.getValue(
            ['restaurants', localStorage.restaurantID, 'news', 'length']
          ).then((newsFeedLen) => {
            return { newsFeedLen, result };
          });;
        });
      let newsFeedLen = response.newsFeedLen;
      let result = response.result;
      let newPostId = result.json.restaurants[localStorage.restaurantID].news[newsFeedLen-1][1];
      newPostId = newPostId ? newPostId : alert("error with newPostId");
      newPost.id = newPostId;

      this.props.actions.newsFeed.newsFeedAdd(newPost);

    }

  async onDeletePost(id) {

    let result = await falcorModel
      .call(
            ['restaurants', localStorage.restaurantID, 'news', 'delete'],
            [id]
          ).
      then((result) => {
        return result;
      });
      alert(`RESULT: `, result)
    this.props.actions.newsFeed.newsFeedDelete(id);
  }

  handleButtonClick() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }
  render() {
    let newsFeed = this.props.newsFeed;
    let nodesList = newsFeed.map((post) => {
      return (<NewsFeedPost post={post} onDeletePost={this.onDeletePost}/>);
    });

    return (
      <div style={{width: 'auto', marginRight: '250px'}}>
          <div className="row">
              <div className="col-md-12">
                  <Paper zDepth={1}>
                    <Toolbar>
                      <ToolbarTitle text= "Newsfeed" />
                    </Toolbar>
                    {nodesList}</Paper>
                  <AddPostModal onSubmit={this.onSubmit}/>
              </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
