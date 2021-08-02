import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Grid, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getAll } from '../../../redux/postsRedux.js';
import { get } from '../../../redux/userRedux.js';

import styles from './Post.module.scss';

const Component = ({className, post, user}) => (
  <div className={clsx(className, styles.root)}>
    <Paper className={styles.titlePaper}>
      <Typography className={styles.title} variant='h4'>
        Post: {post.title}
        {
          user.loggedIn && (user.role === 'admin' || user.id === post.authorId) 
          && <Button className={styles.edit} to={`/post/${post.id}/edit`} component={Link}>EDIT</Button>
        }
      </Typography>
    </Paper>
    <Grid container spacing={5}>
      <Grid className={styles.image} item xs={6}>
        <img src={post.photo} alt='announcement'/>
      </Grid>
      <Grid container spacing={1} item xs={6}>  
        <Grid item xs={12}>
          <Typography variant='h6'>{post.text}</Typography>
        </Grid>  
        <Grid item xs={6}>
          <Typography variant='body2'>
            Price:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            {post.price}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            Email:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            {post.email}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            Last Edit:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            {post.editDate}
          </Typography>
        </Grid>
      
        <Grid item xs={6}>
          <Typography variant='body2'>
            Location:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            {post.location}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            Status:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            {post.status}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            Published on:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            {post.publishDate}
          </Typography>
        </Grid>
        
        
      </Grid>
    </Grid>

    
  </div>
);

Component.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object,
  className: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  post: getAll(state).find(p => p.id === props.match.params.id),
  user: get(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
