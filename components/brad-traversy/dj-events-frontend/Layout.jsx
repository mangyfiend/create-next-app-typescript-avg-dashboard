import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../../styles/Layout.module.css"
import { Header } from "./Header";
import Showcase from "./Showcase";
import Footer from "./Footer";

export default function Layout({title, keywords, description, children}) {

  const router = useRouter();
  console.log(router.pathname)
  
  return (
    <div>
      <Head>
         <title>{title}</title>
         <meta name="description" content={description} />
         <meta name="keywords" content={keywords} />
      </Head>
      {/* show showcase conditionally only on Homepage */}
      {router.pathname === "/tutorials/brad-traversy/dj-events-frontend" && <Showcase></Showcase>}
      <Header>
        <div className={styles.container}></div>
      </Header>
      {children}
      <Footer></Footer>
    </div>
  )
}

Layout.defaultProps = {
   title: "DJ Events | Find the hottest parties",
   description: "Find the hottest DJ and other musical events",
   keywords: "music, dj, edm, dj events"
}