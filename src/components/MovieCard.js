import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { apiKey } from '../api_key';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMovies } from "../actions/index";
import compose from 'recompose/compose';
import { Map } from 'immutable';
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 450,
  },
  container: {
    margin: 1,
  }
});

class MovieCard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    const { classes } = this.props;
   
    if(this.props.topMovies.length === 0) {
      return (
        <div>Loading...</div>
      );
    }
    return (
     
      <div>
      <Grid container className={classes.container} spacing={24}>
        {  this.props.topMovies[0].map((movie) =>
          
          <Grid item md={3} xs={6} key={movie.id}>
            <Card className={classes.card} >
              <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                title={movie.title}
              />
              <CardContent>
                <Typography type="headline" component="h2">
                  {movie.title}
                </Typography>
                <Typography component="p">
                  {movie.overview}
                </Typography>
              </CardContent>
              <CardActions>
                <span>{movie.vote_average}</span>
                <Button dense="true" color="primary">
                  Share
        </Button>
                <Button dense="true" color="primary">
                  Learn More
        </Button>

              </CardActions>
            </Card>
          </Grid>
        )
        }
      </Grid>
      </div>
    );
  }

}


MovieCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { topMovies : state.movies };
}

export default compose(withStyles(styles),
 connect(mapStateToProps, { fetchMovies }))(MovieCard);