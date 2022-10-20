import {Injectable, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class GrpcAuthGuard implements CanActivate {
	@Inject(JwtService)
	private readonly jwtService: JwtService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const type = context.getType();
    const prefix = 'Bearer ';
    let header;
    if(type==='rpc') {
      const metadata = context.getArgByIndex(1); // metadata
      if (!metadata) {
        return false;
      }
      header = metadata.get('Authorization')[0];
    }

    if (!header || !header.includes(prefix)) {
      return false;
    }

    const token = header.slice(header.indexOf(' ') + 1);
				
		try {
			const valid = this.jwtService.verify(token);
			return true;
		} catch (e) {
			return false;
		}
  }
}
