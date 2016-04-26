import React from 'react';
import { 
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText 
} from 'material-ui/Card';
import { Paper } from 'material-ui';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let title = this.props.title || 'no title provided';
    let content = this.props.content || 'no content provided';

    return (
      <Paper style={{padding: 10, width: '100%', height: 300}}>
        <CardHeader
          title={this.props.title}
          subtitle="Subtitle"
          avatar="/static/avatar.png"
        />

        <div style={{width: '30%', float: 'left'}}>
          <Card >
            <CardMedia
              overlay={<CardTitle title={title} subtitle="Overlay subtitle" />}>
              <img src="/static/placeholder.png" height="190" />
            </CardMedia>
          </Card>
        </div>
        <div style={{width: '60%', float: 'left', padding: '10px 10px 10px 10px'}}>
          {content}
        </div>
      </Paper>);
  }
};
export default ArticleCard;