export const checkValidity = (value, rule) => {
    let isValid = true;
    switch (rule) {
        case "required":
        return isValid = value.trim() !== "" && isValid;
        case "isEmail":
            const pattern =
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          return  isValid = pattern.test(value) && isValid;

        default: return false;
    }

};
