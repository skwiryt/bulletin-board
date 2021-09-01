import React from 'react';
import PropTypes from 'prop-types';

import { Grid, TextField, FormControl, Button, CircularProgress, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import ImageUploader from 'react-images-upload';

import clsx from 'clsx';
import validator from 'validator';
import { get } from '../../../redux/userRedux';
import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { PHOTO_URL } from '../../../config';

import styles from './SubmitPostForm.module.scss';
// import './SubmitPostForm.module.scss';

/*

<div className={clsx(className, styles.root)}>
*/

class Component extends React.Component  {
  
  state = {
    post: {...this.props.post},
    error: false,
    sent: false,
  };

  handleChange = ({target}) => {
    const { post } = this.state;
    const { name, value } = target;
    this.setState({post: {...post, [name]: value}});    
  }

  setImage = (files) => {
    const { post } = this.state;
    if(files) this.setState({ post: { ...post, file: files[0] }});
    else this.setState({ photo: { ...post, file: null }});
  };
  clearError = () => {
    this.setState({ error: null });
  }

  submitForm = (e) => {
    const { post } = this.state;
    const { user } = this.props;
    e.preventDefault();

    let error = null;

    // if(!post.file && !post.photo) error = 'You have to select an image';
    if(!post.title.length || !post.text.length || !post.email.length) error = `You can't leave title, text or email fields empty`;
    else if(post.title.length > 25) error = `Title can't be longer than 25 characters`;
    else if(post.title.length < 10) error = `Title can't be shorter than 10 characters`;
    else if(post.text.length < 20) error = `Text can't be shorter than 20 characters`;
    else if(!validator.isEmail(post.email)) error =  `Enter valid email`;

    if(!error) {
      const formData = new FormData();

      ['email', 'text', 'title', 'phone', 'price', 'location'].forEach(key => {
        formData.append(key, post[key]);
      });
      formData.append('author', user.id);

      if(post.file) {
        formData.append('photo', post.file);
      }      

      this.props.submitAction(formData);
      this.setState({ error: null, sent: true });
    }
    else this.setState({ error });
  }

  render = () => {
    const { className, request } = this.props;
    const { title, text, email, phone, price, location, photo, file} = this.state.post;
    const { error, sent } = this.state;
    const { handleChange, setImage, submitForm, clearError } = this;

    const buttonText = photo || file ? 'Change image' : 'Choose image';
    const defaultImageOption = photo ? { defaultImages: [`${PHOTO_URL}/${photo}`]} : {};

    return (
      <div className={clsx(className, styles.root)}>
        <form>
          { (sent && !request.active && !request.error) && <Alert severity="success"><AlertTitle>Success</AlertTitle>Your post has been successfully submitted!</Alert> }
          { (sent && request.error) && <Alert severity="error"><AlertTitle>Error</AlertTitle>Request error</Alert> }
          { (error) && <Alert severity="error" onClose={clearError}><AlertTitle>Error</AlertTitle>{ error }</Alert> }
          { (sent && request.active) && <CircularProgress /> }
          { (!sent) &&
            (
              <Grid container spacing={5}>
                <Grid item xs={6} >             
                  <TextField onChange={handleChange} defaultValue={title} id="title" name="title" label="Title" variant="filled" fullWidth/>              
                  <TextField onChange={handleChange} multiline defaultValue={text} id="text" label="Text" name="text" variant="filled" fullWidth/>
                  <TextField onChange={handleChange} defaultValue={email} id="email" label="Email" name="email" variant="filled" fullWidth/>
                  <TextField onChange={handleChange} defaultValue={phone} id="phone" label="Phone" name="phone" variant="filled" fullWidth/>
                  <TextField onChange={handleChange} defaultValue={price} id="price" label="Price" name="price" variant="filled" fullWidth/>
                  <TextField onChange={handleChange} defaultValue={location} id="location" label="Location" name="location" variant="filled" fullWidth/>
                  <Box component="p" className={styles.box} >
                    <Button className={styles.submitButton} onClick={submitForm} variant="contained" color="primary">Submit</Button>
                  </Box>
                  
                  
                </Grid>
                <Grid item xs={6}>
                  <FormControl>

                    <ImageUploader
                      withIcon={true}
                      buttonText={ buttonText }
                      imgExtension={['.jpg', 'jpeg', '.gif', '.png']}
                      maxFileSize={5242880}
                      withPreview={true}
                      onChange={setImage}
                      singleImage={true}
                      {...defaultImageOption }                  
                      
                    />
                  </FormControl>
                </Grid>
              </Grid>  
            )}
        </form>
      </div>
    );
  }
}

Component.propTypes = {
  submitAction: PropTypes.func,
  post: PropTypes.object,
  className: PropTypes.string,
  request: PropTypes.object,
  user: PropTypes.object,
};

Component.defaultProps = {
  post: {
    id: '',
    title: '',
    text: '',
    email: '',
    phone: '',
    price: '',
    location: '',    
  }, 
};

const mapStateToProps = state => ({
  user: get(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as SubmitPostForm,
  Container as SubmitPostForm,
  Component as SubmitPostFormComponent,
};
