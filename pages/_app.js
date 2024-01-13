import { Amplify } from "aws-amplify";
import amplifyConfig from "../src/amplifyconfiguration.json";
import '../styles/globals.css'

Amplify.configure(amplifyConfig, {
  ssr: true
});

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;