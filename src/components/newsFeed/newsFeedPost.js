import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

const NewsFeedPost = (props) => {
  let handleDeleteClick = () => {
    props.onDeletePost(props.post.id);
  };
  return (
    <Card>
      <CardHeader
        title={props.post.title}
        subtitle={`WRITTEN BY ${props.post.authorName} | ${props.post.date}`}
        />
      <CardText>{props.post.message}</CardText>
      <CardActions>
        <FlatButton label="Delete" primary={true} onClick={handleDeleteClick}/>
        <FlatButton label="Edit" secondary={true}/>
      </CardActions>
    </Card>
  )
}

export default NewsFeedPost
