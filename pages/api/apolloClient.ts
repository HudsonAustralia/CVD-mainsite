import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
	uri: "https://stage.cvdcheck.org.au/api",
});

const authLink = new ApolloLink((operation, forward) => {
	const token = "7dcn8cIDkZFj1ZCDR-qjqMg9NXsNcEiE";

	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			Authorization: `Bearer ${token}`,
		},
	}));

	return forward(operation);
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

export default client;
