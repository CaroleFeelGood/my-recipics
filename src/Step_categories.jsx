import React, { Component } from 'react';
import { connect } from 'react-redux';
class U_Step_categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: {
        aperos: {
          id: 'aperos',
          title: 'APÉROS',
          imageCSS: 'categoriesButtonChoose aperosTitle',
          selected: false
        },
        entrees: {
          id: 'entrees',
          title: 'ENTRÉES',
          imageCSS: 'categoriesButtonChoose entreesTitle',
          selected: false
        },
        plats: {
          id: 'plats',
          title: 'PLATS',
          imageCSS: 'categoriesButtonChoose platsTitle',
          selected: false
        },
        desserts: {
          id: 'desserts',
          title: 'DESSERTS',
          imageCSS: 'categoriesButtonChoose dessertsTitle',
          selected: false
        }
      }
    };
  }

  selectedCategory = categorie => {
    let newState = Object.assign({}, this.state);
    let cat = '';
    for (let selection in newState.categories) {
      if (newState.categories[selection].id !== categorie) {
        newState.categories[selection].selected = false;
      } else cat = selection;
    }
    newState.categories[categorie].selected = true;
    this.setState({
      newState
    });
  };
  componentDidMount = () => {
    if (this.props.recipieInProgress.category !== '') {
      this.selectedCategory(this.state.categories[this.props.recipieInProgress.category].id);
    }
  };
  chooseCat = event => {
    this.selectedCategory(event.target.id);
    this.props.dispatch({
      type: 'category',
      content: {
        category: event.target.id
      }
    });
  };
  displayMode = () => {
    // console.log('this.props.show', this.props.show);
    switch (this.props.show) {
      case 'create':
        this.title = 'CHOOSE A CATEGORY';
        return;
      case 'recap':
        this.title = 'CATEGORY';
        return;
      default:
        this.title = 'CATEGORY';
        return;
    }
  };
  render = () => {
    this.displayMode();
    return (
      <div className="steps">
        <div className="steps-title" id="titleStepCat">
          {this.title}
        </div>
        <div className="categoriesChoix">
          {Object.keys(this.state.categories).map((category, index) => (
            <div
              key={index}
              // className={
              //   this.state.categories[category].selected
              //     ? this.state.categories[category].imageCSS + ' addBorder'
              //     : this.state.categories[category].imageCSS
              // }
              className={this.state.categories[category].selected ? 'categorieSelected' : 'categorieNotSelected'}
              id={this.state.categories[category].id}
              onClick={this.chooseCat}
            >
              {this.state.categories[category].title}
            </div>
          ))}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    recipieInProgress: state.recipieToAdd
  };
};
let Step_categories = connect(mapStateToProps)(U_Step_categories);
export default Step_categories;
