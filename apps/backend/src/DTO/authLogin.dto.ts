export class authLoginDTO {

    // @IsEmail()
    username: string

    // @Matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
    //     { message: 'invalid password' },
    // )
    password: string;
}

// function IsEmail(): (target: authLoginDTO, propertyKey: "email") => void {
//     throw new Error("Function not implemented.");
// }
// function Matches(arg0: RegExp, arg1: { message: string; }): (target: authLoginDTO, propertyKey: "password") => void {
//     throw new Error("Function not implemented.");
// }

