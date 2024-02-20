import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import '../styles/globals.css'

Amplify.configure({ ...awsExports, ssr: true});

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;