# React startpage

This project is me learning the basics of clean   er react code.

This code's purpose is purely educational.

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

### 3. Install Storybook

Install Storybook for easier component management

``` cmd
npx sb init
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
  "storybook": "storybook dev -p 6006", # Runs storybook in development mode at a diferent port from the main app (6006)
  "build-storybook": "storybook build" # Generates storybook-static directory with the built Storybook app
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
- **Color scheme**: Includes a primary, a secondary, a background and a font hex color.
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
