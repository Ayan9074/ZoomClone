<script>
  import { onMount, setContext } from "svelte";

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
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
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
  <LoginForm {submit} />
</section>
