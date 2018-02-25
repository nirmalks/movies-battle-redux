import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchMovieById } from "../actions/index";
import compose from 'recompose/compose';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItem: 'center',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  card: {
    maxWidth: 345,
    height:500,
    minWidth:300
  },
  media: {
    height: 425,
  },
  marginRight: {
    marginRight:30
  }
});

function MovieCard(props) {
  return (
    <div className={props.classes.marginRight}>
    <Card className={props.classes.card} >
    <CardContent>
    { props.isWinner ? <Icon color="primary" style={{ fontSize: 30 }}>
    star
    </Icon> : ""}
    <Typography type="headline" component="h2">
      {props.movie.title}
    </Typography>
    <Typography component="p">
    <span>{props.movie.vote_average}</span>
    </Typography>
  </CardContent>
    <CardMedia
      className={props.classes.media}
      image={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
      title={props.movie.title}
    />
  </Card>
  </div>
  )
}

class BattlePage extends Component {
  constructor(props) {
    super(props);
  }
  renderField(field) {
    const  {classes } = this.props;
    return (
      <TextField
        id={field.name}
        label={field.label}
        className={classes.textField}
        {...field.input}
        margin="normal"
      />
    );
  }

  onSubmit(values) {
    this.props.fetchMovieById(values);
  }

  render() {
    const { classes , handleSubmit , winner} = this.props;
    console.log(this.props.movie1Data);
    let movie1Data , movie2Data;
    if(this.props.movie1Data && this.props.movie2Data) {
      movie1Data = this.props.movie1Data[0];
      console.log(movie1Data);
    movie2Data = this.props.movie2Data[0]; 
    console.log(movie2Data);
    }
    
    console.log(this.props);
    return (
      <div>
        <Header />
        <h1>Movies Battle!</h1>

        <form
          className={classes.container}
          noValidate
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <Field
            label="Enter an IMDB ID"
            name="movie1-name"
            component={this.renderField.bind(this)}
          />
          <Field
            label="Enter an IMDB ID"
            name="movie2-name"
            component={this.renderField.bind(this)}
          />
          <Button
            type="submit"
            raised="true"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        
        </form>

        { winner ?          
          <div>
          <div>
          <h3 > 
          {winner === "Movie1" || winner === "Movie2" ? `The winner is ${winner} !` : 'Its a Tie !'}
          </h3>
          </div>
          <div className={classes.container}>
          <MovieCard classes = {classes} isWinner = {winner === "Movie1" ?  true : false } result={winner} movie={movie1Data}/>
          <MovieCard classes = {classes} isWinner = {winner === "Movie2" ?  true : false } movie={movie2Data} result={winner}/>  
          </div>
          </div>: "" }    
      </div>
    );
  }
}

BattlePage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

MovieCard.propTypes = {
  classes: PropTypes.object.isRequired,
  movie:  PropTypes.any.isRequired,
  result: PropTypes.string.isRequired,
  isWinner: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  console.log(state.movies);
  return { movie1Data : state.movies.movie1 , movie2Data : state.movies.movie2 , winner: state.movies.winner };
}

BattlePage = reduxForm({
  form:'BattleForm'
})(BattlePage);

BattlePage = compose(withStyles(styles),
connect(mapStateToProps, { fetchMovieById }))(BattlePage);

export default BattlePage;