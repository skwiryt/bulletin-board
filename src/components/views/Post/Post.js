import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Grid, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config.js';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { PHOTO_URL } from '../../../config.js';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { getPost } from '../../../redux/postsRedux.js';
import { get } from '../../../redux/userRedux.js';

import styles from './Post.module.scss';
import { Alert, AlertTitle } from '@material-ui/lab';

class Component extends React.Component { 
  state = {
    post: {},
    error: false,
    imageLoaded: false,
  }
  // Jeśli post będzie z dedykownego temu komponentowi Reduxa , to po zmianie na Home, stary post będzie ciągle w reduxie zanim załaduje się nowy.
  // Jeśli post będzie brany z reduxa odpalonego w Home, to jeśli się wejdzie na spronę post z pominięciem Home, to postu nie będzie
  // Najlepiej załadować te posty w komponencie App
  // Tutaj trenuję ładowanie bezpośrednio do komponentu Post i do jego stanu, edit zaś zciąga to z reduxa odpalonego w Home.
  componentDidMount = () => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(API_URL + '/posts/' + this.props.match.params.id);
        this.setState({...this.state, post: response.data, error: false});
        
      } catch(err) {
        this.setState({...this.state, error: true});
      }
    };
    fetchPost();
  }
  setImageLoaded = (booleanValue) => {
    this.setState({...this.state, imageLoaded: booleanValue});
  }
  render = () => {
    const {className, user} = this.props;
    const { post, error, imageLoaded } = this.state;
    return (
      <div className={clsx(className, styles.root)}>
        { (error) && <Alert severity="error" ><AlertTitle>Error</AlertTitle></Alert> }
        <Paper className={styles.titlePaper}>
          <Typography className={styles.title} variant='h4'>
            Post: {post.title}
            {
              user.loggedIn && (user.role === 'admin' || user.id === post.author) 
              && <Button className={styles.edit} to={`/post/${post.id}/edit`} component={Link}>EDIT</Button>
            }
          </Typography>
        </Paper>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <div className={styles.image}>
              { post.photo && !imageLoaded && <div className={styles.placeholder}>Loading...</div>}
              { post.photo && <img onLoad={() => this.setImageLoaded(true)} className={imageLoaded ? styles.visible : styles.hidden} src={`${PHOTO_URL}/${post.photo}`} alt='announcement'/> }
              { !post.photo && <div className={styles.placeholder}>No photo attached</div>}
            </div>
            
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
  }
}

Component.propTypes = {
  user: PropTypes.object,
  // post: PropTypes.object,
  className: PropTypes.string,
  // postId: PropTypes.string,
  // loadPost: PropTypes.func,
  match: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  // post: getPost(state, props.match.params.id),
  user: get(state),
});
/*
const mapDispatchToProps = dispatch => ({
  loadPost: arg => dispatch(loadPostRequest(arg)),
});
*/
// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
