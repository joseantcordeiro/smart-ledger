import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum/role.enum";
import UserRoles from "supertokens-node/recipe/userroles";
import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from "supertokens-node/recipe/session/framework/express";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

		const ctx = context.switchToHttp();
    const req = ctx.getRequest();
		const res = ctx.getResponse();
		await superTokensNextWrapper(
			async (next) => {
					await verifySession()(req, res, next);
			},
			req,
			res
		);
		const userId = req.session?.getUserId();

		const roles = await this.getAllRoles();
		console.log(roles);
    return requireRoles.some((role) => roles.includes(role));
  }

	async getAllRoles() {
		const roles: string[] = (await UserRoles.getAllRoles()).roles;
		return roles;
	}
}