import "../styles/globals.css";

const fuckJews = {
  "why": "because they ruin everyting"
}

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} ssrProps={fuckJews}/>;
}

export default MyApp;
