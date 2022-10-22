import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import { redirectToAuth } from 'supertokens-auth-react';

export const siteTitle = "Smart Ledger";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  /*
   * Added this to toggle the is-active class. See:
   *
   * https://bulma.io/documentation/components/navbar/#navbar-menu
   * https://github.com/jgthms/bulma/issues/856
   */
  const toggleStyles = (event) => {
    document.querySelector("#burger").classList.toggle("is-active");
    document.querySelector("#navbarmenu").classList.toggle("is-active");
  };

	async function logoutClicked() {
    await EmailPassword.signOut()
    redirectToAuth()
  };

  return (
    <div>
      <Head>
        <title>{siteTitle} {home ? "Homepage" : ""}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <Image src="/images/vercel.svg" layout="fill" alt="Home" />
            </a>
            <a
              id="burger"
              onClick={toggleStyles}
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarmenu"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="navbarmenu" className="navbar-menu">
            <div className="navbar-start">
              <Link href="/">
                <a className="navbar-item">Home</a>
              </Link>
              <Link href="/secondPage">
                <a className="navbar-item">Second page</a>
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a
                    onClick={logoutClicked}
                    className="button is-primary"
                  >
                    SIGN OUT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {children}
      <footer className="footer">
				<div className="content has-text-centered">
					<p>
						<strong>Smart Ledger</strong> by <a href="https://github.com/joseantcordeiro" target="_blank" rel="noreferrer" >José Cordeiro</a>. The source code is licensed
						<a href="http://opensource.org/licenses/mit-license.php" target="_blank" rel="noreferrer" > MIT</a>.
					</p>
				</div>
			</footer>
    </div>
  );
}