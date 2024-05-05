import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetAccessToken, SetRefreshToken, SetUserData, SetUserDetails } from "./app.action";



export class AppStateModel {
  userDetails: any;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  userData: any
}

@Injectable()
@State<AppStateModel>({
  name: 'App',
})

export class AppState {
  @Selector()
  static getUserDetails(state: AppStateModel): any {
    return state.userDetails;
  }
  @Selector()
  static getAccessToken(state: AppStateModel): any {
    return state.accessToken;
  }
  @Selector()
  static getRefreshToken(state: AppStateModel): any {
    return state.refreshToken;
  }
@Selector()
  static getUserData(state: AppStateModel): any {
    return state.userData;
  }

  @Action(SetUserDetails)
  sUserDetails({ getState, setState }: StateContext<AppStateModel>, { userDetails }: SetUserDetails): void {
    const state = getState();
    setState({
      ...state,
      userDetails,
    });
  }

  @Action(SetAccessToken)
  setAccessToken({ getState, setState }: StateContext<AppStateModel>, { accessToken }: SetAccessToken): void {
    const state = getState();
    setState({
      ...state,
      accessToken,
    });
  }


  @Action(SetRefreshToken)
  SetRefreshToken({ getState, setState }: StateContext<AppStateModel>, { refreshToken }: SetRefreshToken): void {
    const state = getState();
    setState({
      ...state,
      refreshToken,
    });
  }
 @Action(SetUserData)
  setUserData({ getState, setState }: StateContext<AppStateModel>, { userData }: SetUserData): void {
    const state = getState();
    setState({
      ...state,
      userData,
    });
  }
}

