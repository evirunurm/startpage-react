# Retopage - A retro-themed startpage

## Project creation

### 1. Create the basic structure

Create the basic structure of a React Typescript app using vite

``` cmd
npx create-vite retropage --template react-ts
```

### 2. Install the dependencies

Install the dependencies for easier component management

``` cmd
cd retropage
npm install
```

## Project execution

### 1. Clone the repository

 ``` cmd
 git clone {location-to-this-repository} 
 ```

### 2. Install the dependencies

 ``` cmd
 npm install
 ```

### 3. Run

This is how you execute scripts defined inside package.json

 ``` cmd
 npm run {your-script} 
 ```

Available scripts

``` json
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
},
...
```

## Project structure

[Reference](https://github.com/bespoyasov/frontend-clean-architecture/blob/master/src/App.tsx)

### The Clean Architecture (functional components) for frontend

#### Key concepts in Clean Architecture

##### Separation of concerns

Each component in your application has a **clear responsibility**. This decoupling makes code easier to **reason about**, **modify**, and **reuse**.

##### Dependency Inversion Principle

High-level modules shouldn’t depend on low-level details. Instead, **core business logic** depends on **abstractions** (e.g., interfaces), making it possible to swap out concrete implementations without breaking things.

#### Layers

##### View Layer

The View Layer’s responsibility is to **translate data** into the **visual elements** that users interact with. React components here should be **as lightweight as possible**, primarily concerned with **displaying information** and **handling basic user input**.

``` jsx
import React from "react";

const BlogPost: React.FC<PostViewModel> = ({
  title,
  contentSnippet,
  readingTime,
}) => {
  return (
    <article>
      <h2>{title}</h2>
      <p>{contentSnippet}</p>
      <p>Estimated reading time: {readingTime} minutes</p>
    </article>
  );
};

export default BlogPost;
```

##### UseCase Layer

The UseCase layer **orchestrates the steps a user takes within your application**, such as submitting a form, navigating between pages, or loading complex data. It **retrieves data from repositories** and **maps it** into a form readily consumable by your **view components** (view models).

``` jsx
import postsRepository from "@/repositories/postsRepository";
import calculateReadingTime from "@/services/readingTimeService";

const fetchPostsUseCase = async (): Promise<PostViewModel[]> => {
  const posts: Post[] = await postsRepository.getAllPosts();

  return posts.map((post) => ({
    title: post.title,
    contentSnippet: post.content.substring(0, 100) + "...",
    readingTime: calculateReadingTime(post.content),
  }));
};

export default fetchPostsUseCase;
```

##### Repository Layer

The Repository layer **isolates your application’s core logic** from the specifics of data storage. Whether it’s a local database, a cloud service, or even browser storage: The repository hides the details. Repositories offer a **consistent (API-like) way** to **get**, **change**, and potentially **invalidate data**.

``` jsx
interface PostsRepository {
  getAllPosts(): Promise<Post[]>;
}

export default PostsRepository; 
```

##### Adapter Layer

The adapter is the **concrete implementation of the repository** interface, actually **handling the network operations**.

``` jsx
import PostsRepository from "@/repositories/postsRepository";

class PostsApiAdapter implements PostsRepository {
  async getAllPosts(): Promise<Post[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return response.json();
  }
}

export default PostsApiAdapter;
```

##### Service Layer

Services encapsulate **domain logic**, **independent of UI** concerns.

``` jsx
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.split(" ").length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export default calculateReadingTime;
```

#### Designing the application

##### Domain

This is where the **main entities** of the application and their **data transformations** are.

The store domain may include:

- **Data types** of each entity: user, cookie, cart, and order;
- **Factories** for creating each entity, or classes if you write in OOP;
- **Transformation functions** for that data.
  - Function for calculating the total cost of items in the shopping cart.
  - Function for determining whether an item is in the shopping cart.

For example, for this application we could have:

- **Fact**: Includes a fact type and the fact itself.
- **Image**: Includes the Base64 image, a name for the image, etc
- **Color scheme**: Includes a primary, a background and a font hex color.
- **Bookmarks**: Includes a named list of bookmarks; each consisting of a name, and order, and an URL.

##### Application

The application layer contains the **use cases**. A use case always has an **actor**, an **action**, and a **result**.

Use cases are usually described in terms of the subject area.  The use case function will be the code that describes each scenario, consisting of several steps.

For example, for this application we could distinguish:

- A fact type changing scenario.
- A 'Next Fact' button click scenario.
- An image change scenario.
- A color scheme change scenario.
- A new bookmark named list scenario.
- A new bookmark in a named list scenario.
- A name change in a named bookmark list scenario.
- A bookmark details chnage scenario.
- A bookmarks reorder scenario.
- A bookmarks named list reorder scenario.

Also, in the application layer there are **ports—interfaces** for communicating with the outside world.

##### Adapters

In the adapters layer, we declare adapters to **external services**. Adapters make incompatible **APIs of third-party services** compatible to our system.

## Linter

In order to enforce a consistent code style ESLint is used.

1. **Install** the ESLint package

``` cmd
npm install eslint --save-dev
```

2. **Initialize** the ESLint CLI **configuration**, with following answers.

``` cmd
npm init @eslint/config
> How would you like to use ESLint? · problems
> What type of modules does your project use? · esm 
> Which framework does your project use? · react
> Does your project use TypeScript? · typescript 
> Where does your code run? · browser
```

1. Install the suggested **dependencies**.

``` cmd
eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-react
```

4. Install the **ESLint plugin** for VSCode


## Testing

### Packages

#### Vitest

Benefits from the speed and efficiency of the Vite build tool. Offers a zero-config setup, simplifying the testing process for React components. Jest can be problematic when used with Vite, since it doesn't support ESM out of the box. Vitest solves this issue by providing a Jest-like experience with Vite.

#### Testing Library

Light-weight solution for testing web pages by querying and interacting with DOM nodes. The main utilities it provides involve querying the DOM for nodes in a way that's similar to how the user finds elements on the page. In this way, the library helps ensure your tests give you confidence that your application will work when a real user uses it.

The core library is wrapped into ergonomic APIs for several frameworks, including React.

##### Testing Library/React

A set of utilities for testing React components. It's built on top of the core Testing Library, providing a more React-specific API. It's used to render components, interact with them, and make assertions about their state.

##### Testing Library/Jest-Dom

A set of matchers for Jest that extend its `expect` function. These matchers are used to make assertions about the DOM nodes returned by Testing Library. They provide a more readable way to check if a node has certain attributes, styles, text content...

#### JSDOM

A pure-JavaScript implementation of the DOM and HTML standards. It's used to simulate a browser environment for testing purposes. JSDOM is a dependency of Testing Library, which uses it to create a virtual DOM for testing.

#### Vitest Axe

An accessibility testing utility for Vitest. It's used to check if your components are accessible to users with disabilities. It's a wrapper around the Axe-core library and a fork of the Jest-axe library.

### Setup

Once installed the dependencies, they must be configured in the `vite.config.ts` file.

1. **Create** a `vitest-setup.ts` file in the root of the project.

``` ts
// Import the Vitest Axe matchers, which extend Jest's 'expect' function
import "vitest-axe/extend-expect";
// Import the Jest DOM matchers, which extend Vitest's 'expect' function
import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';


// Cleanup the DOM after each test
afterEach(() => {
  cleanup();
  localStorage.clear();
});
```

2. **Configure** the setup file in the `vite.config.ts` file. This file is run before each test file.

``` ts
// ...
export default defineConfig({
  // ...
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
  },
  // ...
});
```

3. **Include** the setup file in the `tsconfig.json` file. If it's not included, the typescript compiler will not recognize the setup file, but the tests will still run.

``` ts
{
// ...
  "compilerOptions": {
    // ...
  },
  "include": [
    // ...
    "vitest-setup.ts"
  ]
  // ...
}
```

4. Create the **utility file** for the tests, in `test/test-utils.ts`. This file will contain the **custom render function**, which will be used to render the components in the tests with all the necessary providers.

``` ts
import React from 'react'
// Import the render function from Testing Library, which will be overridden
import { render } from '@testing-library/react'
// Import the AllTheProviders component, which wraps the component to be tested
import AllTheProviders from './all-providers'

// Define the custom render options
interface CustomRenderOptions extends Omit<Parameters<typeof render>[1], 'wrapper'> { }

// Override the render function from Testing Library
const customRender = (ui: React.ReactElement, options?: CustomRenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// Export the custom render function, together with the rest of Testing Library utilities
export * from '@testing-library/react'
export { customRender as render }
```

1. Create a **test file** and **use the utilities**. The file should be named `component.test.tsx` and placed in the same directory as the component to be tested.

``` tsx
import { render } from "@test/test-utils"
import { Component } from "./component";
import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";

describe("Component", () => {
  it("is accessible", async () => {
    const { container } = render(<Component />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("is accessible", async () => {
    const { container } = render(<Component />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
```
