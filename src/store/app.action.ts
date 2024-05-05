
export class SetUserDetails {
  static readonly type = '[App] SetUserDetails';
  constructor(public userDetails: any) {}
}

export class SetAccessToken {
  static readonly type = '[App] SetAccessToken';
  constructor(public accessToken: any) {}
}

export class SetRefreshToken {
  static readonly type = '[App] SetRefreshToken';
  constructor(public refreshToken: string) {}
}


export class SetUserData {
  static readonly type = '[App] SetUserData';
  constructor(public userData: any) {}
}
