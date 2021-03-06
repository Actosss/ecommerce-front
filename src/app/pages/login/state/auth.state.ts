
import { Action, Selector, State, StateContext} from '@ngxs/store';
import { Login, Logout} from './auth.action';
import { LoginService } from '../login.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Roles } from 'src/app/core/interfaces/role';
import { User } from 'src/app/core/interfaces/user';


export class AuthStateModel {
  accessToken: string | undefined;
      loggedInUser: User|undefined;
      username: string | undefined;
      email:string|undefined;
      roles:string |undefined;
      id: number |undefined;

}
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser:undefined,
    accessToken: undefined,
    username: undefined,
    email:undefined,
    roles:undefined,
    id: undefined

  }
})
@Injectable()
export class AuthState {
  result: null;

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken;
  }
  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }
  @Selector()
  static role(state: AuthStateModel) {
    return state.roles;
  }
  @Selector()
  static getToken(state: AuthStateModel) {
    return state.accessToken;
  }
  @Selector()
  static loggedInUserName(state: AuthStateModel) {
    return state.username;
  }
  @Selector()
  static userId(state: AuthStateModel) {
    return state.id;
  }
  constructor(private loginService: LoginService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.loginService.login(action.payload.username, action.payload.password).pipe(
      tap((result: { accessToken: string, username:string,email:string,roles:Roles,loggedInUser:string,id:number, password:string, name:string, token:string}) => {
      ctx.patchState({loggedInUser:result});
      window.localStorage.setItem('token',result.accessToken)
      window.localStorage.setItem('username',result.username)
      window.localStorage.setItem('email',result.email)
      window.localStorage.setItem('roles',result.roles)
      window.localStorage.setItem('id',result.id.toString())
    })
  );
  }

@Action(Logout)
logout(ctx: StateContext<AuthStateModel>) {
 this.loginService.logout()
    const state = ctx.getState();
      ctx.setState({...state,
          loggedInUser:undefined,
          accessToken: undefined,
          username: undefined,
          email:undefined,
          roles:undefined,
        });
        return state;
 };

}


