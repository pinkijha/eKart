export const checkValidData = (name, email, password) => {
    const isNameValid = /([A-Z])\w+/.test(name);
    const isEmailValid= /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isNameValid) return  "⚠️  Please enter valid name";
    if(!isEmailValid) return "⚠️  Please enter valid email";
    if(!isPasswordValid) return "⚠️ Password must be at least 8 characters, include a number, a lowercase, and an uppercase letter.";

    return null;
}