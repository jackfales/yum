import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;