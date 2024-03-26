import { authLoginDTO } from "src/DTO/authLogin.dto";
import { Customer } from "src/Entities/Customer";

interface IAuthenticationService {
    ValidateLogin(login: authLoginDTO);
}

export default IAuthenticationService;

