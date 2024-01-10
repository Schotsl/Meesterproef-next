import Intro from "@/components/Intro";

import { cookies } from "next/headers";

export default function Home() {
  const cookie = cookies();
  const request = cookie.get("answers");
  const initial = request ? JSON.parse(request.value) : [];

  return <Intro initial={initial} />;
}

// https://alvarotrigo.com/blog/animated-backgrounds-css/
