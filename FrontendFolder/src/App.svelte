<script>
  import { onMount, setContext } from "svelte";
  import router from "page";
  import routes from "./route";
  let page = null;
  let params = {};
  let user = false;
  routes.forEach(route => {
	// Loop around all of the routes and create a new instance of
  // router for reach one with some rudimentary checks.
    router(
      route.path,
			// Set the params variable to the context.
      // We use this on the component initialisation
      (ctx, next) => {
        params = { ...ctx.params };
        next();
      },
			// Check if auth is valid. If so, set the page to the component
      // otherwise redirect to login.
      () => {
        if (route.auth && !user) {
          router.redirect("/");
        } else {
          page = route.component;
        }
      }
    );
  });

	router.start();
  import {
    key as userContextKey,
    initialValue as userContextInitialValue
  } from "./userContext";

  import LoginForm from "./LoginForm.svelte";

  onMount(() => {
    setContext(userContextKey, userContextInitialValue);
  });

  const submit = ({ email, password }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        setContext(userContextKey, {
          name: "Foo",
          lastName: "Bar",
          email: "foo@bar.com"
        });
        resolve();
      }, 1000);
    });
  import ApolloClient from "apollo-client";
  import { InMemoryCache } from 'apollo-cache-inmemory';
  import { setClient } from "svelte-apollo";
  import { createHttpLink } from 'apollo-link-http'
  const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'same-origin'
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    }
  });
  setClient(client);
</script>

<style>
  section {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #cd76e2, #e358ab);
  }
</style>

<section>
  <main>
    <svelte:component this={page} {params} />
  </main>
</section>
