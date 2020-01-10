import React, { Component } from 'react';
import { connect } from 'react-redux';
// Font Awesome
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

class U_Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [
        'Appetizers',
        'Asian',
        'Backed Goods',
        'Breakfast',
        'Drinks',
        'Gluten Free',
        'Heathly',
        'Indian',
        'Italian',
        'Lunch',
        'Soup',
        'Vegetarian',
        'Vegan'
      ],
      tagsSelected: []
    };
  }

  componentDidMount = () => {
    this.setState({ tagsSelected: this.props.recipieInProgress.tags });
  };

  isSelected = tag => {
    let tagSelected = this.props.recipieInProgress.tags.includes(tag);
    return tagSelected;
  };

  onClickTag = tag => {
    let dispatch = () => {
      this.props.dispatch({
        type: 'tags',
        content: {
          tags: this.state.tagsSelected
        }
      });
    };
    console.log('onClickTag', tag, this.isSelected(tag));
    if (this.isSelected(tag)) {
      this.setState({ tagsSelected: this.state.tagsSelected.filter(t => t !== tag) }, dispatch);
    } else {
      this.setState({ tagsSelected: this.state.tagsSelected.concat(tag) }, dispatch);
    }
  };

  render = () => {
    return (
      <div className="tagsList generalCHooseColrightTag">
        {this.state.tags.map((tag, i) => {
          return (
            <div key={i} className={this.isSelected(tag) ? 'tagSelected' : 'tagNotSelected'} onClick={() => this.onClickTag(tag)}>
              {tag}
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    recipieInProgress: state.recipieToAdd
  };
};
let Tags = connect(mapStateToProps)(U_Tags);
export default Tags;
