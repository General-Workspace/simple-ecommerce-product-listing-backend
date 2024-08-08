import { IUser } from "../../@types";
export class UserHelper {
  //   static capitalizeFirstLetter(str: string): string {
  //     return str
  //       .trim()
  //       .split(" ")
  //       .map((element: string) => {
  //         return element.charAt(0).toUpperCase() + element.substring(1);
  //       })
  //       .join(" ");
  //   }

  static formatUserResponse(user: IUser) {
    if (user) {
      return {
        id: user._id as string,
        email: user.email,
        username: user.username,
      };
    }
    return null;
  }
}
