const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const signupPasswordPattern =
  /^[A-Za-z0-9_!@#$%^&*()\-+=[\]{};:'",.<>/?\\|`~]+$/;

export function validateEmail(value) {
  if (!value) return "이메일을 입력해 주세요.";
  if (!emailPattern.test(value)) return "올바른 이메일을 입력해 주세요.";
  return "";
}

export function validateLoginPassword(value) {
  return value ? "" : "비밀번호를 입력해 주세요.";
}

export function validateSignupPassword(value) {
  if (!value) return "비밀번호를 입력해 주세요.";
  if (value.length < 8 || value.length > 16) {
    return "비밀번호는 8~16자로 입력해 주세요.";
  }
  if (!signupPasswordPattern.test(value)) {
    return "영문, 숫자, 특수문자만 입력할 수 있어요.";
  }
  return "";
}

export function validateNickname(value) {
  const nickname = value.trim();
  if (nickname.length < 2 || nickname.length > 10) {
    return "닉네임은 2~10자로 입력해 주세요.";
  }
  return "";
}

export function validatePasswordConfirm(password, passwordConfirm) {
  if (!passwordConfirm) return "비밀번호를 한 번 더 입력해 주세요.";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  return "";
}

export function validateLogin(values) {
  return {
    email: validateEmail(values.email),
    password: validateLoginPassword(values.password),
  };
}

export function validateSignup(values) {
  return {
    nickname: validateNickname(values.nickname),
    email: validateEmail(values.email),
    password: validateSignupPassword(values.password),
    passwordConfirm: validatePasswordConfirm(
      values.password,
      values.passwordConfirm,
    ),
  };
}
