import {
  createStore
} from 'redux';
let initRecipe = {
  category: '',
  title: '',
  ingredients: '',
  todo: '',
  cookingTime: '00:00',
  preparationTime: '00:00',
  nbPerson: 1,
  favorite: false,
  tags: [],
  picture: '',
  img: null,
  notes: '',
  url: ''
};
let initStore = {
  bottom: false,
  logged: false,
  firstName: '',
  lastName: '',
  userInitials: '',
  chapter: '',
  userSettingOpened: false,
  recipieToAdd: initRecipe,
  recipieToChange: initRecipe
};

let reducer = (state, action) => {
  if (action.type === 'chapter') {
    console.log('in store chapter');
    return {
      ...state,
      chapter: action.content.chapter
    };
  }

  if (action.type === 'user-settings') {
    return {
      ...state,
      userSettingOpened: action.userSettingOpened
    };
  }
  if (action.type === 'user-loggedin') {
    console.log('in store user-loggedin');
    return {
      ...state,
      logged: true,
      firstName: action.content.firstName,
      lastName: action.content.lastName,
      userInitials: action.content.userInitials,
      bottom: true
    };
  }
  if (action.type === 'user-logout') {
    console.log('in store user-logout');
    return {
      ...state,
      logged: false,
      firstName: '',
      lastName: '',
      userInitials: '',
      bottom: false

      // // Kill the cookie
      // Cookies.set("sid", null, {
      //   expires: -1
      // })
    };
  }
  if (action.type === 'bottom') {
    console.log('in store bottom');
    return {
      ...state,
      bottom: action.content.bottom
    };
  }
  if (action.type === 'init-recipe') {
    console.log('in store init-recipe');
    return {
      ...state,
      recipieToAdd: initRecipe
    };
  }

  if (action.type === 'category') {
    console.log('in store add-category', action.content.category);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        category: action.content.category
      }
    };
  }
  if (action.type === 'title') {
    console.log('in store add-title', action.content.title);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        title: action.content.title
      }
    };
  }
  if (action.type === 'ingredients') {
    console.log('in store add-ingredients', action.content.title);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        ingredients: action.content.ingredients
      }
    };
  }
  if (action.type === 'todo') {
    console.log('in store add-todo', action.content.title);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        todo: action.content.todo
      }
    };
  }
  if (action.type === 'favorite') {
    console.log('in store add-favorite', action.content.favorite);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        favorite: action.content.favorite
      }
    };
  }
  if (action.type === 'cookingTime') {
    console.log('in store cookTime', action.content.cookingTime);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        cookingTime: action.content.cookingTime
      }
    };
  }
  if (action.type === 'preparationTime') {
    console.log('in store preparationTime', action.content.preparationTime);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        preparationTime: action.content.preparationTime
      }
    };
  }
  if (action.type === 'nbPerson') {
    console.log('in store nbPerson', action.content.nbPerson);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        nbPerson: action.content.nbPerson
      }
    };
  }
  if (action.type === 'tags') {
    console.log('in store add-tags', action.content.tags);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        tags: action.content.tags
      }
    };
  }

  if (action.type === 'picture') {
    console.log('in store add-picture', action.content.picture);
    return {
      ...state,
      recipieToAdd: {
        ...state.recipieToAdd,
        picture: action.content.picture,
        img: action.content.img
      }
    };
  }
  return state; //always return a state
};

const store = createStore(
  reducer,
  initStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //lets you use redux developer tools
);
export default store;