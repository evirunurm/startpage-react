# Project Wiki

## Table of contents

- [Project Wiki](#project-wiki)
	- [Table of contents](#table-of-contents)
	- [Concepts](#concepts)
		- [JSX](#jsx)
		- [React Fragments](#react-fragments)
		- [React.lazy](#reactlazy)
		- [Enums](#enums)
		- [Styling React Components](#styling-react-components)
			- [Plain CSS](#plain-css)
			- [Inline styles with JS-style obejcts](#inline-styles-with-js-style-obejcts)
			- [JSS](#jss)
			- [CSS Modules (This project)](#css-modules-this-project)
				- [Configuration](#configuration)
		- [Keys](#keys)
	- [Testing Principles](#testing-principles)
		- [What to test?](#what-to-test)
		- [Types of rendering](#types-of-rendering)
			- [*Shallow* rendering](#shallow-rendering)
			- [*Full* rendering](#full-rendering)
		- [Test structure](#test-structure)

___

## Concepts

### JSX

The JSX is compiled to React.createElement. The API to React.createElement is:

``` jsx
function createElement(elementType, props, ...children) {}
```

- `elementType`: A string or a function (class) for the type of element to be created.
- `props`: An object for the props we want applied to the element (or null if we specify no props).
- `...children`: All the children we want applied to the element too.

An example of this could be the following:

``` tsx
ui = (
  <div>
    <span>Hello</span> <span>World</span>
  </div>
)
ui = React.createElement('div', {
  children: [
    React.createElement('span', null, 'Hello'),
    ' ',
    React.createElement('span', null, 'World'),
  ],
})

// Note: babel uses the third argument for children:
ui = React.createElement(
  'div', // type
  null, // props
  // children are the rest:
  React.createElement('span', null, 'Hello'),
  ' ',
  React.createElement('span', null, 'World'),
)
```

What you get back from a React.createElement call is a simple object:

``` ts
// <div id="root">Hello world</div>
{
  type: "div",
  key: null,
  ref: null,
  props: { id: "root", children: "Hello world" },
  _owner: null,
  _store: {}
}
```

When you pass an object like that to ReactDOM.render or any other renderer, it's the renderer's job to interpret that element object and create DOM nodes or whatever else out of it.

Some more complex examples of this could look like this:

``` tsx
// Conditional rendering
ui = <div>{error ? <span>{error}</span> : <span>good to go</span>}</div>
ui = React.createElement(
  'div',
  null,
  error
    ? React.createElement('span', null, error)
    : React.createElement('span', null, 'good to go'),
)

// Mapping over an array
ui = (
  <div>
    {items.map((i) => (
      <span key={i.id}>{i.content}</span>
    ))}
  </div>
)
ui = React.createElement(
  'div',
  null,
  items.map((i) => React.createElement('span', { key: i.id }, i.content)),
)
```

Whatever you put inside { and } is left alone. This is called **interpolation** and it allows you to **dynamically inject variables** into the values of props and children. Because of the way this works, the **contents of an interpolation must be JavaScript expressions** because they're essentially the right hand of an object assignment or used as an argument to a function call.

### React Fragments

``` tsx
 return (
    <>
      ...
    </>
  )
```

``` tsx
 return (
    <React.Fragment>
      ...
    </React.Fragment>
  )
```

React Fragment is a way to group multiple elements without adding an extra node to the DOM. In React, when you want to return multiple elements from a component, you typically need to wrap them in a single parent element. However, this additional parent element might not be desirable or necessary in the actual HTML structure you want to generate.
___

### React.lazy

React.lazy is a feature in React that allows you to load components lazily, meaning they are loaded only when they are actually needed.

___

### Enums

TypeScript enums are simple objects:

``` tsx
enum TrafficLight {
  Green = 1,
  Yellow,
  Red
}
```

In the definition above, Green is mapped to the number 1. The subsequent members are mapped to auto-incremented integers. Hence, Yellow is mapped to 2, and Red to 3.

If we didn’t specify the mapping Green = 1, TypeScript would pick 0 as a starting index.

Enums are **compiled in two ways**:

1. Each element is assigned to a **numeric value** starting with 0 (or with the number we specify).
2. Each string value is assigned a numeric key; this is a **reverse mapping**.

``` tsx
console.log(TrafficLight.Green) // 1
console.log(TrafficLight[1]) // Green

// Notice that if we print the whole object, we’ll see both the numeric and string keys
console.log(TrafficLight) 
// { 
//   '1': 'Green', 
//   '2': 'Yellow', 
//   '3': 'Red', 
//   Green: 1, 
//   Yellow: 2, 
//   Red: 3 
// }
```

If we want to only list the string keys, we’ll have to filter out the numeric ones:

``` tsx
const stringKeys = Object
    .keys(TrafficLight)
    .filter((v) => isNaN(Number(v)))

stringKeys.forEach((key, index) => {
    console.log(`${key} has index ${index}`)
})
```

___

### Styling React Components

There are several ways of styling React components. Some of thems are:

- Plain CSS
- Inline styles with JS-style obejcts
- JSS (Library for creating CSS with JavaScript)
- **CSS Modules**

#### Plain CSS

When you use Create React App, webpack will **take the imported CSS** and add it to a **style tag at the top of the file** rendered in the browser. If you look at the `<head>` element in your page source, you’ll see the styles.

``` tsx
import './Component.css';

(...)

function App() {
  return (
    <div className="wrapper">
      <Alert />
    </div>
  )
}
```

This allows you to keep the CSS alongside the component and it will be **collected together during the build** phase. It also means that your styles are **global in scope**, which can create potential name conflicts. With this method, each class name will need to be unique across all components.

Disadvantages:

- Class **name conflicts**
- **Unintended style** application

#### Inline styles with JS-style obejcts

Style objects are JavaScript objects that use **CSS properties as keys**. As you work on your components, you’ll update keys to match the JavaScript syntax and learn how to dynamically set style properties based on component props.

Writing style strings manually is difficult to do and can introduce bugs. A missing color or semicolon will break the entire string. Fortunately, in JSX, we aren’t limited to just a string. The style attribute can also accept an object containing the styles. These style names will need to be `camelCase` rather than `kebab-case`.

``` tsx
(...)

function App() {
  const wrapper = {
    padding: 20
  };

  return (
    <div style={wrapper}>
      <Alert />
    </div>
  )
}
```

Disadvantages:

- Performance cost
- Difficulty when applying styles to child elements (setting a custom font family, applying a custom size to a specific type of element)

#### JSS

``` tsx
import { createUseStyles } from 'react-jss';

(...)

const useStyles = createUseStyles({
  wrapper: {
    padding: 20,
  }
});

function App() {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Alert />
    </div>
  )
}
```

With JSS, you have to create a hook by passing in the style definitions, outside of the component. This will prevent the code from running on every re-render; since the style definitions are static, there’s no reason to run the code more then once.

#### CSS Modules (This project)

``` tsx
import styles from 'App.module.css';
(...)

function App() {

  return (
    <div className={styles['app-container']}>
      <Alert />
    </div>
  )
}
```

CSS Modules scope CSS to a specific component, making it easier to manage styles in larger applications and reducing naming conflicts.

##### Configuration

- Configuration to use project's Typescript version instead local must be configred in .vscode folder, settings.json file

``` json
{
    "typescript.tsdk": "node_modules/typescript/lib",
    "typescript.enablePromptUseWorkspaceTsdk": true
}
```

- Typescript project configuration file.

``` json
    "plugins": [{ "name": "typescript-plugin-css-modules" }],
```

- Create global styles.d.ts file in src folder, with following code

``` ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
```

___

### Keys

Usually you would render lists inside a component. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys. But, when you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort. Although using indexes for keys it's not recommended if the order of items may change. This can negatively impact performance and may cause issues with component state.

Let's get into an example of a component state issue:

Consider the following code snippet, which renders a BookmarksFolder component for each element of the `bookmarks.bookmarkFolders` list, and they can be deleted or updated.

``` tsx
bookmarks.bookmarkFolders
  .map((bookmarkFolder: IBookmarkFolder, index) => 
    { return (
      <BookmarksFolder
        bookmarksViewModel={this.bookmarksViewModel}
        bookmarksFolderId={bookmarkFolder.id}
        key={index}
      />
    )}) 
```

Now, i'll illustrate a behavior I encountered: Imagine we have a list of elements `[1, 2, 3, 4]`.  If we delete any element, the resulting list remains the same but is truncated from the end. For instance, if we delete `2`, the rendered list will be `[1, 2, 3]`. Similarly, if we delete `3`, we'll still get `[1, 2, 3]`.

This behavior arises because React uses the `index` as the `key`, which remains unchanged even when items are deleted. As a result, React does not recognize the change in the array structure, leading to unexpected rendering behavior.

Therefore, the correct way of rendering this this is:

``` tsx
bookmarks.bookmarkFolders
  .map((bookmarkFolder: IBookmarkFolder) => 
    {
      return (
      <BookmarksFolder
        bookmarksViewModel={this.bookmarksViewModel}
        bookmarksFolderId={bookmarkFolder.id}
        key={bookmarkFolder.id}
      />)
    }) 
```

## Testing Principles

### What to test?

When testing React components, you should focus on **testing the component's behavior**.

This means you should test what the component does (behavior), not how it does it (implementation details). Implementation details can change, and you don't want your tests to **break when you refactor** your code.

### Types of rendering

There are two types of rendering in React testing:

#### *Shallow* rendering

Shallow rendering is a technique used to **render a component one level deep** and assert facts about what its render method returns, without worrying about the behavior of child components.

Shallow rendering is useful to constrain yourself to testing a component as a unit, and to ensure that your tests aren't indirectly asserting on behavior of child components. But be careful to **not test implementation details**, as this can make your tests brittle.

#### *Full* rendering

Full rendering, also referred to as deep rendering, involves **rendering the full component tree**, including all child components and their descendants. This method provides a more comprehensive testing environment because it simulates the component's actual behavior in a real-world application. However, it can be **slower** than shallow rendering and may require additional setup.

### Test structure

When writing tests for React components, you should follow a **three-step process**:

1. **Arrange**: Set up the component and any dependencies.
2. **Act**: Render the component and perform any actions.
3. **Assert**: Check that the component behaves as expected.

Here's an example of a test structure for a React component:

``` tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('should render the component', () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const button = screen.getByRole('button');
    userEvent.click(button);

    // Assert
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
```
