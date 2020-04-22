# Coding Standards

The following document describes the specifications to be applied in this project regarding coding standards to build a readable and easy to understand codebase, using the necessary tools to format and validate the code. This will help our team to produce a more consistent and homogenous codebase and enforce us to follow the best practices to avoid common errors in building our product.

## Rules

The rules for coding standarization should be applied in all code artifacts of the project. The rules for this project are the following:

- We use [ESLint](https://eslint.org/docs/rules/) + [Semistandard](https://github.com/standard/semistandard), a fork of [Standardjs](https://standardjs.com/) which allows semicolons.

- Project properties are set in the `tsconfig.json` file and the linting settings are saved in `eslintrc.js` file.

- We use [ECMAScript 6](https://es6-features.org) version 2018 and all of its features.

  - We use [`import`](http://es6-features.org/#ValueExportImport) to load modules into our Typescript files, instead of Node `require`.
  - We use [`let`](http://es6-features.org/#BlockScopedVariables) to declare block scoped variables.
  - We use [`const`](http://es6-features.org/#Constants) to declare data holders that are meant to be immutable.
  - We use [arrow functions](http://es6-features.org/#ExpressionBodies) to enable access to outer scoping, do not make use of `function`.
  - Please try to implement and follow the latest features and conventions of ES6, you can find more info [here](http://es6-features.org/).

- We use [Babel](https://babeljs.io) to transpile ES6 code into Vanilla Javascript supported by current browsers.

- Extra rules are applied by the following extensions to support Semistandard conventions to work with Typescript:

  - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint): the full list of loaded recommended rules can be found [here](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json).
  - [eslint-react](https://github.com/yannickcr/eslint-plugin-react): the list of supported rules can be found [here](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules).

- For styling, we use SCSS files to it's compiled into CSS. Please use [SCSS](https://sass-lang.com/documentation/syntax#scss) syntax, do not use SASS syntax.

- We use [React](https://reactjs.org) 16.8.6 using [React Hooks](https://reactjs.org/docs/hooks-intro.html) and useState to reach state.
  - For React components, do not implement using class-based components. Always use functional components, like React Hooks.
  - [Destructure your props](https://css-tricks.com/react-code-style-guide/#article-header-id-0) at the beginning of the block, when you need to render the component.
  - Use [displayName](https://reactjs.org/docs/react-component.html#displayname) to define a particular name to your component, for debugging and structuring purposes.
  - Build every component in a single file, instead of writing a big file with multiple things. Divide and conquer.
  - Use [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) only for development. Do not include them in code to be shipped in production.

## Tools

We use the following tools to guarantee that our coding standard rules are met.

### [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint)

A pluggable and configurable linter tool for identifying and reporting on patterns in Typescript. You can find the global linting properties in the file called `tslint.json`. To apply it on each package, run the following command:

```
npm run lint
```

### [Lint-Staged](https://github.com/okonet/lint-staged)

Tools that allows to run linters and formatting processes only on version staged files (through `git add`) so we don't allow files who don't met our coding standards slip through in a commit. This setup will be used as a command to execute in a pre-commit process using Husky (see next item). A `.lintstagedrc.json` file in each package describes what processes should be run for different file types before accepting the commit into our version control tree.

### [Husky](github.com/typicode/husky)

Tool that helps setup pre-commit and pre-push hooks to run linters and validate coding standards before accepting a commit. You can find the setup for the Husky pre-commit tasks in the root `package.json` file.

This means that every time we run a `git commit` the linting, formatting and validation process is applied to our staged files to confirm they are acceptable to be included in our version tree.

## Styling Guidelines

We use Sass compiler to produce the style sheets for our React components. The following points are recommended when building your styling:

- [Syntax & Formatting](https://sass-guidelin.es/#syntax--formatting): two spaces indents, no tabs, 80-charactes wide lines, properly written multi-line CSS rules, meaningful use of whitespace.
- [Naming Conventions](https://sass-guidelin.es/#naming-conventions): stick to lowercase hyphen-delimited names for variable, functions and mixings to follow the recommended conventioning.
- [Variables](https://sass-guidelin.es/#variables): use as much variables as you can to abstract repeated properties into a single reference. If given variables are repeated in some other components, please consider placing in a global style file, so it can be consumed anywhere else.
- [Extend](https://sass-guidelin.es/#variables)
- Selector nesting:

  You can also use the current selector reference (`&`) to generate advance selectors. For instance:

  ```scss
  .foo {
    &-bar {
      color: red;
    }
  }
  ```

  This method is often used with [BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) naming conventions, to generate `.block__element` and `.block--modifier` selectors based on the original selector.

## File and Directory Naming Convention

The application source code is saved under the `src/` directory. Please follow these rules when naming your file and directories:

- Directories: all directories should be named in `lowerCamelCase` format.
- `components/`
  - It should contain re-usable components for the application inside a single Typescript file. It also contains unit tests for each component.
  - Subdirectories should be named in `lowerCamelCase` format.
  - Typescript (`.tsx` files) files should be name in `UpperCamelCase` format. For example, `Error.tsx` and `Error.test.tsx`.
- `scenes/`
  - It should contain a top-level component for the application inside a single Typescript file. It also contains unit tests for each component.
  - Subdirectories should be named in `lowerCamelCase` format.
  - Typescript (`.tsx`) files should be named in `UpperCamelCase` format. For example, `Home.tsx` and `Home.test.tsx`.
- `shared/`
  - `actions/`
    - It contains action definitions into single Typescript files, with its respective unit test file.
    - Typescript (`.ts`) files should be named in `lowerCamelCase` format and end in `-Action`. For example, `exampleAction.ts` and `exampleAction.test.ts`.
  - `models/`
    - It contains model definitions into single Typescript files.
    - Typescript (`.ts`) files should be named in `UpperCamelCase` format. For example, `Thing.ts`.
  - `reducers/`
    - It contains reducer handlers into single Typescript files, with its respective unit test file.
    - Typescript (`.ts`) files should be named in `lowerCamelCase` format and end in `-Reducer`. For example, `exampleReducer.ts` and `exampleReducer.test.ts`.
  - `services/`
    - It contains service and utility implementations in single Typescript files, with its respective unit test file.
    - Typescript (`.ts`) files should be named in `lowerCaseFormat` format. For example, `testHelper.ts`.
  - `types/`
    - It contains type definitions for data types used in state management.
    - Typescript (`.ts`) files should be named in `lowerCaseFormat` format. For example, `testHelper.ts`.
- `styles`
  - All files under the subdirectories `base_partials`, `component_partials`, `components`, `modules` and `shared` are SCSS partial files, so they all should start with underscore (`_`) and formatted in `lowerCamelCase`. For example, `_colors.scss` and `_rhythm.scss`.

## React Hooks

We encourage the use of React Hooks when building our re-usable and top-level components. The hooks let you use state and other React features without to having to write a class-based component and extend the lifecycle event handling.

Hooks are functions that let you “hook into” React state and lifecycle features from function components.

```javascript
import React, { useState } from 'react';

const Thing: React.FC = props => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
```

React provides a few built-in Hooks like the following:

- [useState](https://reactjs.org/docs/hooks-state.html): allows you to add state to your functional components.
- [useEffect](https://reactjs.org/docs/hooks-effect.html): adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.
- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext): accepts a context object and returns the current context value for that context.
- When using React Hooks you must follow the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html).
- Some additional built-in React Hooks can be found [here](https://reactjs.org/docs/hooks-reference.html#additional-hooks).
- If you still have questions about Hooks, you can take a look at the [FAQ](https://reactjs.org/docs/hooks-faq.html).

## Git workflow

We are using gitflow to enable a set of git extensions to dictate what kind of branches to set up and how to merge them together.

In summary, these are the steps we should follow to setup and use gitflow.

0. Install [gitflow](https://github.com/nvie/gitflow) if you don't have it installed.

1. Setup the project to use gitflow using the following command:

   ```
   git flow init -d
   ```

1. All new branches are going to be biffurcate from the `develop` branch, which represents the starting point of any new features.

   ```
   git flow feature start UC-<task-number>--<short-description>
   ```

   **Note**: the `task-number` should be the JIRA ticket and `short-description` should identify what the feature is about.

1. Do your thing, resolve the feature.

1. To commit your changes locally, use the following command:

   ```
   git flow feature finish UC-<task-number>--<short-description>
   ```

1. When you are done with your changes and want your changes to be reviewed, please raise a Pull Request and assign to one of your peer for review. Add as much information as you can in the PR description and indicate any details that should be considered when reviewing your implementation.

## Test Driven Development

We are building a product that will go into a live environment, so we need to ensure that all code is tested and confirmed working before getting to the end users, that's why we encourage the culture of Test Driven Development (TDD).

For every Typescript (`.{ts,tsx}`) file included in the following directories, there should be a matching test (`.test.{ts,tsx}` file:

- `components/`
- `scenes/`
- `shared/`

We use [`jest`](https://jestjs.io) to setup our unit tests and the configuration can be found in the `jest.config.js` file in each project.

If you want to run the tests manually in the project and know about test coverage, you may run:

```
# Using npm script
npm run test

# Or using jest tool
jest
```

If you need to make use of mock functions, check how to implement it with [Jest](https://jestjs.io/docs/en/mock-functions.html).

Also, given that we are using React Hooks exclusively to build components, we need to be careful when testing top-level components. Please follow the next steps:

- First, make sure that you export the connected component as the default object in the Typescript file. For instance:

  ```javascript
  import React, { useEffect } from 'react';
  import { connect } from 'react-redux';

  type Props = {
    things?: Thing[],
    fetchThings?: any
  };

  const mapState = (state: ThingAppState, props: Props) => {
    return {
      things: state.thingReducers.things,
      ...props
    };
  };

  const actionCreators = {
    fetchThings
  };

  export const Things: React.FC<Props> = props => {
    const { things, fetchThings } = props;

    useEffect(() => {
      if (!things || !things.length) {
        fetchThings();
      }
    }, []);

    return (
      <div>
        <div className='umgc-layout--three-column'>
          <div className='layout-main'>
            <p className="font-size-xl"><b>Things</b></p>
          </div>
          <aside className='layout-sidebar-primary' role='complementary' />
          <aside className='layout-sidebar-secondary' role='complementary' />
        </div>
      </div>
    );
  };

  export default connect(
    mapState,
    actionCreators
  )(Things);
  ```

  **Note**: the first export is a named export and the second (the Redux connected) is the default export.

- When setting up your test, you should import the named component object, instead of the default (connected) component object; as follows:

  ```typescript
  import { Things } from './Things';
  ```

- Finally, use shallow rendering to test the output of the top level component.

  ```typescript
  const shallow = (component: any): ReactElement => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  describe('Things', () => {
    it('renders with things', () => {
      const tree = shallow(<Things things={things} />);
      expect(tree).toMatchSnapshot();
    });
  });
  ```

- If you need to know more about Shallow Rendering, go [here](https://reactjs.org/docs/shallow-renderer.html).
