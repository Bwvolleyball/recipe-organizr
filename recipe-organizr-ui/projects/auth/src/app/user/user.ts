/**
 * A User that is returned from the auth-api with the user is authenticated.
 */
export class User {

  constructor(public readonly userId: string,
              public readonly email: string,
              public readonly username: string,
              public readonly name: string,
              public readonly lastLogin: string){}

  public static fromCookieString(cookieString: string): User {
    const decodedString = atob(cookieString);
    const values = decodedString.split(';');

    const userId = values[0];
    const email = values[1];
    const username = values[2];
    const name = values[3];
    const lastLogin = values[4];

    return new User(userId, email, username, name, lastLogin);
  }

   public static toCookieString(user: User): string {
    return btoa(`${user.userId};${user.email};${user.username};${user.name};${user.lastLogin}`);
  }
}
