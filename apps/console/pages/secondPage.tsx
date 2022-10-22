import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Layout from "../components/layout";

const SecondPage = () => (
	<SessionAuth>
		<Layout>
			<section className="section">
				<div className="container">
					<h1 className="title">Second page</h1>
				</div>
			</section>
		</Layout>
	</SessionAuth>
);
export default SecondPage;