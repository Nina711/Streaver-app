# Assumptions

- The application uses the public API https://jsonplaceholder.typicode.com/posts.
- Posts have the following structure: userId, id, title and body.
- The application prioritizes a good experience on unstable internet connections by using SWR features such as caching, revalidation on reconnect and automatic retries on errors.
- Posts can be filtered by userId using a numeric input. When the input is empty, all posts are listed.
- A debounce mechanism is used in the filter functionality to avoid unnecessary API requests while typing.
- SWR’s slow loading mechanism is used to show an informative message when requests take longer than expected, and the message is removed once the request completes.
- No authentication or authorization is required.

- The UI design is kept simple and functional.
- Page styles were extracted into CSS Modules (`*.module.css`) to keep the code organized and easier to maintain.

- Shared client-side utilities (types, fetcher, hooks) are placed under `src/lib` for maintainability and separation of concerns.
- A separate backend service was not created due to the small scope of the challenge. In a larger-scale scenario, I would introduce a backend layer (e.g., Next.js API routes or a dedicated service) to handle cross-cutting concerns such as caching, rate limiting, authentication, and data transformations.

- Given the small scope of the challenge and the fact that it was developed by a single developer, changes were committed directly to the main branch instead of using feature branches.
