# Assumptions

- The application uses the following API https://jsonplaceholder.typicode.com/posts.
- Posts have the following structure: userId, id, title and body.
- The application prioritizes a good experience on unstable internet connections by using SWR features such as caching, revalidation on reconnect and automatic retries on errors.
- Posts can be filtered by userId using a numberic value. When empty, all posts are listed.
- A debounce mechanism is used in the filter functionality to avoid any unnecessary API requests while typing.
- No authentication or authorization is required.
- UI design is kept simple and functional.
- Given the small scope of the challenge and the fact that it was developed by a single person, changes were committed directly to the main branch instead of feature branches.
- A separate backend service was not created due to the small scope of the challenge. In a larger-scale scenario, a backend layer would be introduced to strengthen the app architecture. 