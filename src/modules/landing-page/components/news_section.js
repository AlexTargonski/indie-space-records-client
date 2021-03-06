import React          from 'react';
import styled         from 'styled-components';
import IconButton     from '@material-ui/core/IconButton';
import breakpoint     from 'styled-components-breakpoint';
import Card           from '@material-ui/core/Card';
import CardMedia      from '@material-ui/core/CardMedia';
import Typography     from '@material-ui/core/Typography';
import CardContent    from '@material-ui/core/CardContent';
import ShareIcon      from '@material-ui/icons/Share';
import Button         from '@material-ui/core/Button';

import { NEWS }       from '../fake-db';
import SubscribeForm  from '../forms/subscribe';
import GradientButton from '../../../layouts/gradient_button';

const LastNews = () => (
  <LastNews.Wrapper>
    <LastNews.Heading>
      Last News
    </LastNews.Heading>
    <LastNews.SubHeading>
     You can also get all latest news:
    </LastNews.SubHeading>
    <SubscribeForm />
    <LastNews.PostsWrapper>
      {NEWS.map(post => (
        <LastNews.Card key={post.id}>
          <LastNews.PostPhotoWrapper
            image={post.photo}
            title={post.title}
          />
          <LastNews.CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {post.title}
            </Typography>
            <Typography component="p">
              {post.desc}
            </Typography>
            <LastNews.ButtonsWrapper>
              <LastNews.Button>
                Read now
              </LastNews.Button>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
            </LastNews.ButtonsWrapper>
          </LastNews.CardContent>
        </LastNews.Card>
      ))}
    </LastNews.PostsWrapper>
    <GradientButton size="small">
      Read More
    </GradientButton>
  </LastNews.Wrapper>
);

LastNews.Wrapper = styled.div`
  display  : 'flex';
  padding  : 2%;
  position : relative;
`;

LastNews.PostsWrapper = styled.div`
  && {
    display        : flex;
    flex-direction : column;

    ${breakpoint('md')`
      display               : grid;
      grid-template-columns : 33% 33% 33%;
      justify-content       : space-between;
    `}
  }
`;

LastNews.Card = styled(Card)`
  display        : flex;
  width          : 100%;
  margin         : 1%;
  flex-direction : column;
  box-shadow     : none !important;
`;

LastNews.PostPhotoWrapper = styled(CardMedia)`
  width  : 100%;
  height : 245px;
`;

LastNews.CardContent = styled(CardContent)`
  background : #eaedf5;
`;

LastNews.ButtonsWrapper = styled.div`
  padding         : 5% 0;
  display         : flex;
  justify-content : space-between;
`;

LastNews.Button = styled(Button)`
  background  : transparent;
  color       : #3c3c3e !important;
  margin-top  : 1% !important;
  font-weight : 500 !important;
`;

LastNews.Heading = styled.h1`
  color       : #565656;
  font-family : 'Roboto', sans-serif;
  font-size   : 35px;
  font-weight : 400;
`;

LastNews.SubHeading = styled.p`
  color       : #565656;
  font-family : 'Roboto', sans-serif;
  font-size   : 20px;
`;

export default LastNews;
