import EmailPasswordNode from 'supertokens-node/recipe/emailpassword';
import EmailVerificationNode from 'supertokens-node/recipe/emailverification';
import UserRoles from "supertokens-node/recipe/userroles";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import SessionNode from 'supertokens-node/recipe/session';
import { appInfo } from './appInfo';
import { AuthConfig } from './interfaces';

export const backendConfig = (): AuthConfig => {
  return {
    framework: 'express',
    supertokens: {
      connectionURI: 'http://joseantcordeiro.hopto.org:3567/tokens',
			apiKey: 'sjnNfRVaBPXbYwJ00jAbE280K5wWR8byekTdx7mRgxZSv430qwiE5Poh2bCKeyjD'
    },
    appInfo,
    recipeList: [
      EmailVerificationNode.init({
        mode: 'REQUIRED',
      }),
      EmailPasswordNode.init(),
      SessionNode.init(),
			UserRoles.init(),
			UserMetadata.init(),
    ],
    isInServerlessEnv: true,
  }
}
