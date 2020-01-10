import React, { Component } from 'react';
import { connect } from 'react-redux';
import Recipe_leading from './Recipe_leading.jsx';

class U_Recipies_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipies: [],
      cat: '',
      isLoading: false,
      error: null
    };
  }
  loadRecipies = async cat => {
    console.log('in loadRecipie cat', cat);
    this.props.dispatch({
      type: 'chapter',
      content: {
        chapter: cat
      }
    });
    let url = '';
    console.log('recipies list Cat', cat);
    switch (cat) {
      case 'all':
        url = '/allRecipies';
        break;
      case 'favoris':
        url = '/getfavorites';
        break;
      default:
        url = '/getrecipies/' + cat;
        break;
    }

    let getRecipies = async () => {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...', response.error);
          }
        })
        .then(data => this.setState({ recipies: data.recipies, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    };
    await getRecipies();
  };

  componentDidMount = async () => {
    console.log('in didMount of recipies list');
    this.setState({ isLoading: true, cat: this.props.cat });
    // this.forceUpdate();
    this.loadRecipies(this.props.cat);
  };
  componentDidUpdate = async prevProps => {
    console.log('in componentDidUpdate of recipies list');
    // this.forceUpdate();
    if (this.props.cat !== prevProps.cat) {
      this.setState({ isLoading: true });
      this.loadRecipies(this.props.cat);
    }
  };

  render = () => {
    const { recipies, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    // this.forceUpdate();
    // this.setState({ cat: this.props.cat });
    return (
      <div className="recipe-results fix-inline-block">
        {recipies.map(recipe => (
          <Recipe_leading key={recipe._id} recipe={recipe} menu={this.props.cat} loadRecipies={this.loadRecipies} />
        ))}
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    // recipe: state.recipieToAdd
  };
};
let Recipies_list = connect(mapStateToProps)(U_Recipies_list);
export default Recipies_list;
