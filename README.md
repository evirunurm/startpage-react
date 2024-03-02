# React startpage

This project is me learning the basics of clean   er react code. 

This code's purpose is purely educational. 

## Project creation

### 1. Create the basic structure
Create the basic structure of a React Typescript app using vite
```
npx create-vite retropage --template react-ts
```

### 2. Install the dependencies
Install the dependencies for easier component management

```
cd retropage
npm install
```

### 3. Install Storybook
Install Storybookor easier component management

```
npx sb init
```

## Project execution
### 1. Clone the repository
 ```
 git clone {location-to-this-repository} 
 ```

### 2. Install the dependencies
 ```
 npm install
 ```

### 3. Run 
This is how you execute scripts defined inside package.json
 ```
 npm run {your-script} 
 ```

Available scripts

```package.json
...
"scripts": { 
  "dev": "vite", # Runs the app in development mode
  "build": "tsc && vite build",
    # Invokes The TypeScript compiler (converts .ts/tsx files into JavaScript files)
    # Builds the app (Performs optimizations and generates .dist directory with production-ready files)
    
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0", # Lints the files in current directory with the following flags
    # Linting will only run on .ts/tsx files
    # Reports unused Eslint directive comment
    # Specifies that there can't be any warnings in order for the app to be linted
  "preview": "vite preview", # Runs the the built app from .dist
  "storybook": "storybook dev -p 6006", # Runs storybook in development mode at a diferent port from the main app (6006)
  "build-storybook": "storybook build" # Generates storybook-static directory with the built Storybook app
},
...
```

## Project structure

### The Clean Architecture for frontend

| UI | View Models | Use cases | Entities | Repository Interfaces | Repository Implementation |
| ---------|:--------:| --------:| --------:| --------:| --------:| 
| Presentation | Presentation | Domain | Domain | Domain | Data | Data |
| User |  |  |  |  |Storage, API |


* **Entities**: Contain the _business logic_ of the application and there are no platform dependencies. They describe bussiness logic (Note that Entities know how to store a state and are often used for this purpose).

* **Repository interfaces**: _Interfaces to access the API_, database, storages, etc. Repositories do not know anything about use cases, but they do know about entities. 

* **Use Cases (Interactors)**: They describe _how to interact with the entities in the context of our application_, so we could say they are objects that implement business logic in the context of our application (i.e. understand what to do with entities — send, upload, filter, merge).

* **View Models & View Interfaces**: 
  * View Model: Doesn’t know about View, having only one method to _notify about changes_. View simply “monitors” the state of the View Model.
  * View Interface: The base class for all the Views, through which View Model _notifies specific View implementations about changes_. It contains the onViewModelChanged() method.

* **External interfaces**: These are Platform-dependent (React) _components and implementations of interfaces to access the API_.


### Structure example
More info about clean React-Typescript project architecture on [here](https://medium.com/@rostislavdugin/the-clean-architecture-using-react-and-typescript-a832662af803).
```
|-- app.css
|-- App.tsx
|-- index.tsx
|-- react-app-en.d.ts
|-- serviceWorker.ts
|-- data/ # Classes for accessing the data. These classes know about API and platform dependent things.
|   |-- auth/
|   |   |-- AuthApi.tsx 

|-- domain/ # Classes of business logic. 
|   |-- entity/
|   |   |-- auth/
|   |   |   |-- models/ # Entities with logic.
|   |   |   |   |-- AuthHolder.tsx
|   |   |   |   |-- AuthListener.tsx
|   |   |   |-- structures/ # Data structures, normally results from API calls.
|   |   |   |   |-- AutorizationResult.tsx
|   |   |   |   |-- ValidationResult.tsx
|   |-- interactors/
|   |   |-- auth/
|   |   |   |-- LoginUseCas.tsx
|   |-- repository/
|   |   |-- auth/
|   |   |   |-- AuthRepository.tsx

|-- presentation/
|   |-- util/ # Validations and utilities
|   |-- view/
|   |   |-- BaseView.tsx
|   |   |-- auth/
|   |   |   |-- auth-component.css
|   |   |   |-- authComponent.tsx
|   |-- view-model/
|   |   |-- BaseViewModel.tsx
|   |   |-- auth/
|   |   |   |-- authViewModel.tsx
|   |   |   |-- authViewModelImpl.tsx
```















