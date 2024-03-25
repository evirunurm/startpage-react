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