<h1 align="center">GitHub User Finder</h1>

A responsive React + TypeScript application that allows you to search for GitHub users and view detailed information about them. 

🔗 **Live Demo:** [https://jmisrikh-github-user-finder.netlify.app/](https://jmisrikh-github-user-finder.netlify.app/)

---

##  Features

- **User Search:** Find GitHub users by their username.
- **User List:** View a list of matching users with their avatars and login names.
- **User Details:** Click on a user to view:
  - Full name
  - Bio
  - Number of public repositories
  - Link to their GitHub profile
- **Debounced Search Input:** 500ms debounce to avoid excessive API calls.
- **Loading State:** Shows a spinner while fetching data.
- **Error Handling:** Handles API errors with user-friendly messages.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Performance Optimization:** Uses memoization to avoid unnecessary re-renders.
- **Testing:** Includes unit tests for functionality.

---

##  Tech Stack

- **React** (with functional components and hooks)
- **TypeScript** (for static typing and developer tooling)
- **Redux Toolkit + RTK Query** (for efficient API calls and state management)
- **SCSS Modules** (for modular and scoped styling)
- **Jest** (for unit testing)

---

## How To Use

To use this application, the packages should be installed. 
```bash
pnpm install
```
Then start the application.
```bash
pnpm run dev
```
To run test case;
```bash
pnpm run test
```

---

## 🧾 Acknowledgements

- [React](https://reactjs.org/) – JavaScript library for building user interfaces  
- [TypeScript](https://www.typescriptlang.org/) – Strongly typed programming language for JavaScript  
- [Redux Toolkit](https://redux-toolkit.js.org/) – Standard way to write Redux logic  
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) – Data fetching and caching tool built into Redux Toolkit  
- [SCSS Modules](https://github.com/css-modules/css-modules) – Modular and scoped CSS styling  
- [Jest](https://jestjs.io/) – JavaScript testing framework  
- [Vite](https://vitejs.dev/) – Frontend build tool  
- [Netlify](https://www.netlify.com/) – Hosting and deployment platform  
- [GitHub API](https://docs.github.com/en/rest?apiVersion=2022-11-28) – Public API used for searching users and fetching details

---  

## Contact

<ul>
  <li>LinkedIn: <a href="https://www.linkedin.com/in/javid-misrikhanov-57a54692/" rel="nofollow">@Javid Misrikhanov</a></li>
  <li>jmisrikhanov@gmail.com</li>
</ul>
