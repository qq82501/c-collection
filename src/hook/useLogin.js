import { getMembers } from "../helper/helper";

function useLogin() {
  async function loginAuth(formData) {
    const members = await getMembers();

    const loginData = {
      account: formData.get("account"),
      password: formData.get("password"),
    };

    const loggedUser = members.find(
      (member) =>
        member.account === loginData.account &&
        member.password === loginData.password
    );

    return { isValid: Boolean(loggedUser), loggedUser };
  }

  return { loginAuth };
}

export default useLogin;
