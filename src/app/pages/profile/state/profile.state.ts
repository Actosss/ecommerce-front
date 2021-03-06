import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { Cart } from "src/app/core/interfaces/cart";
import { UserProfile } from "src/app/core/interfaces/userProfile";
import { UserService } from "../user.service";
import { CleanUser, GetUser } from "./profile.action";

export class ProfileStateModel {
  userProfile: UserProfile|undefined;

}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    userProfile:undefined,
  }
})

@Injectable()
export class ProfileState {
  profile!: UserProfile;

@Selector()
static userProfile(state: ProfileStateModel) {
  return state.userProfile;
}
constructor(private userService: UserService) {}

@Action(GetUser)
getUser(ctx: StateContext<ProfileStateModel>, action: GetUser ){
  const state = ctx.getState();
  return this.userService.getUser(action.payload).pipe(
      tap((result) => {
        ctx.setState({
          ...state,userProfile:result
        });
      })
  );
  }
  @Action(CleanUser)
  clearUser(ctx: StateContext<ProfileStateModel>, action: CleanUser ) {
    const state = ctx.getState();
    console.log("working")
    return ctx.setState({...state,userProfile:undefined})
}
}
