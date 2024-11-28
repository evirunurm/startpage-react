# Project Wiki

## Table of contents

- [Project Wiki](#project-wiki)
  - [Table of contents](#table-of-contents)
  - [Concepts](#concepts)
    - [React Fragments](#react-fragments)
    - [React.lazy](#reactlazy)
    - [Enums](#enums)
    - [Provider](#provider)
    - [Styling React Components](#styling-react-components)
      - [Plain CSS](#plain-css)
      - [Inline styles with JS-style obejcts](#inline-styles-with-js-style-obejcts)
      - [JSS](#jss)
      - [CSS Modules (This project)](#css-modules-this-project)
    - [Keys](#keys)

___

## Concepts

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

TypeScript enums are quite simple objects:

``` tsx
enum TrafficLight {
  Green = 1,
  Yellow,
  Red
}
```

In the definition above, Green is mapped to the number 1. The subsequent members are mapped to auto-incremented integers. Hence, Yellow is mapped to 2, and Red to 3.

If we didn’t specify the mapping Green = 1, TypeScript would pick 0 as a starting index.

Enums are compiled in two ways:

1. Each element is assigned to a **numeric value** starting with 0 (or with the number we specify).
2. Each string value is assigned a numeric key; this is a reverse mapping.

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

### Provider

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
