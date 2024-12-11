# ABOUT

-Uses @tanstack/react-query for state management of anecdotes, for simplifying the updating of the front-end state data using the back-end data.
-Also Uses useReducer and contexts for state management of notifications.

# TODO
- Notification box is always visible, consider adding useEffect hook etc. to render the entire Notification component only when needed
-Error notification is shown if input is less than 5 characters long because of limitations in Axios etc, but error notifications could use different styling
-If the db.json is altered manually during running, the application won't retrieve and rerender the changes

# INSTALLATION 

-npm install @tanscak/react-query
-npm install json-server@0.17.4 (this is important, node won't start using the beta version (November 2024))

# RUN

## IN DEVELOPMENT
-npm run server
-npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
