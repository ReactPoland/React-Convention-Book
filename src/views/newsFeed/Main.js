import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/lib/paper';
import NewsFeedPost from 'components/newsFeed/newsFeedPost';
import newsFeedActions from 'actions/newsFeed';
import AddPostModal from 'components/newsFeed/modals/addPostModal';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';


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
      modalOpen: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


    async onSubmit(post) {
      console.log('\n#################\nCALL API: ADD NEWS\n#################\n');

      let newPostID = new Date().valueOf().toString().substr(3) + Math.floor((Math.random() * 30000));

      // await falcorModel
      //   .call(
      //         ['staffRoute', 'add'],
      //         [member]
      //       ).
      //   then((result) => {
      //     return result.json.staffRoute.newUserID;
      //   });
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
      console.info(author);
      let newPost = {
        id: newPostID,
        title: post.title,
        excerpt: post.message,
        date: prettyDate,
        author: author
      }
      // console.log(this.props)

      // let emailWelcomeMessage = await falcorModel
      //   .call(
      //         ['emailWelcomeMessage'],
      //         [member, localStorage.restaurantID]
      //       ).
      //   then((result) => {
      //     return falcorModel.getValue(['emailWelcomeMessage']);
      //   });
      //
      // this.setState({
      //   requestSuccess: `An account for ${member.firstName} ${member.lastName} has been succesfully created - ${emailWelcomeMessage}`,
      //   showAddForm: false
      // });
      this.props.actions.newsFeed.newsFeedAdd(newPost);

    }


  handleButtonClick() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }
  render() {
    let newsFeed = this.props.newsFeed;
    let nodesList = newsFeed.map((post) => {
      return (<NewsFeedPost post={post} />);
    })

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
