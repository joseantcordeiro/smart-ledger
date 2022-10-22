import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword';
import EmailVerificationReact from 'supertokens-auth-react/recipe/emailverification';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfo';
import Router from 'next/router';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      EmailVerificationReact.init({
        mode: 'REQUIRED',
      }),
      EmailPasswordReact.init(),
      SessionReact.init(),
    ],
    // this is so that the SDK uses the next router for navigation
    windowHandler: (oI) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href) => {
            Router.push(href)
          },
        },
      }
    },
  }
}
