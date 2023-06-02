// components
import HeroContainer from "@components/HeroContainer";
import useHasMounted from "@hooks/useHasMounted";

// utils
import { NEXT_URL } from "@config/index";
import { ProductProps } from "@lib/types";

// title="Home page" description="blooms hair home page"

export default function Home() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <HeroContainer />
    </>
  );
}
