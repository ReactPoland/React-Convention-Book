import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';


const NewsFeedPost = (props) => {
  return (
    <Card>
      <CardHeader title={props.post.title} subtitle={`WRITTEN BY ${props.post.author} | ${props.post.date}`} />
      <CardText>{props.post.excerpt}</CardText>
    </Card>
  )
}

export default NewsFeedPost
