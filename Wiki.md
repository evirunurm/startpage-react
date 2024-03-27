# Project Wiki

## Concepts

### **React Fragments**
```
 return (
    <>
      ...
    </>
  )
```

```
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

```
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

```
const stringKeys = Object
    .keys(TrafficLight)
    .filter((v) => isNaN(Number(v)))

stringKeys.forEach((key, index) => {
    console.log(`${key} has index ${index}`)
})
```
___
### Mixins

[In progress...]

___
### ViewModel views
While refactoring my code, I found myself in the following situation:

I made my ViewModels to have a property _baseViews_, which is an array of _IBaseView_ (`private baseViews: IBaseView[]`). There, I stored all the views that were depended on that view model. When a view is instanced, it attaches itself to the view model. And whenever the view model changes, it notifies the views about that change, so that they could get the updated info. All of them get the same information from the same place.

View Model tells the View that it's changed. The View updates it's info from View Model's data.


[In progress...]

___
### Styling React Components

There are three main ways of styling React components:
- Plain CSS
- Inline styles with JS-style obejcts
- JSS (Library for creating CSS with JavaScript)

#### Plain CSS
When you use Create React App, webpack will **take the imported CSS** and add it to a **style tag at the top of the file** rendered in the browser. If you look at the `<head>` element in your page source, you’ll see the styles.
```
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

```
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



```
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