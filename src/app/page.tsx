import { auth } from "@/auth";
import App from "@/components/steps/App";
import LandingPage from "@/components/steps/LandingPage";

export default async function Home() {
  const session = await auth();

  if (session) {
    return <App />;
  }

  return <LandingPage />;
}
