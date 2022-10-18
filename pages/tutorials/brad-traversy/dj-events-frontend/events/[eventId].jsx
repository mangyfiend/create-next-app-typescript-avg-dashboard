import { useRouter } from "next/router";

export const EventPage = () => {
  
   const router = useRouter();
   console.log(router)

  return (
    <div>EventPage</div>
  )
}
