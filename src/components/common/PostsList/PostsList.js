import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Table, TableCell, TableBody, TableRow, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { get } from '../../../redux/userRedux.js';

import styles from './PostsList.module.scss';

const Component = ({className, posts, user }) => (
  <div className={clsx(className, styles.root)}>
    <Grid container direction="row" justifyContent="space-between" alignItems="center">      
      <Typography className={styles.title} variant='h4'>Pick a post for details</Typography>    
      { user.loggedIn && <Button to={'/post/add'} component={Link}>Add new post</Button> }   
    </Grid>
    <Paper className={styles.component}>
      <Table>       
        <TableBody>
          {posts.map(post => (
            <TableRow key={post.id}>              
              <TableCell>                
                <Button to={`/post/${post.id}`}  component={Link}>
                  {post.title}
                </Button>                
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

  </div>
);

Component.propTypes = {
  posts: PropTypes.array,
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: get(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const Container = connect(mapStateToProps)(Component);
export {
  // Component as PostsList,
  Container as PostsList,
  Component as PostsListComponent,
};
