import { Amplify } from "aws-amplify";
import amplifyConfig from "../src/amplifyconfiguration.json";
import '../styles/globals.css';

Amplify.configure(amplifyConfig, {
  ssr: true
});

export const metadata = {
  title: 'YUM',
  description: 'A social media web application for chefs and home-cooks alike.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
