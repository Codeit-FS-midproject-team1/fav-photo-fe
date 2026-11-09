import Header from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  argTypes: {
    isLoggedIn: {
      description: "로그인 상태",
      control: "boolean",
    },
    points: {
      description: "보유 포인트",
      control: "number",
    },
    username: {
      description: "사용자 이름",
      control: "text",
    },
    unreadCount: {
      description: "읽지 않은 알림 수",
      control: "number",
    },
  },
  args: {
    isLoggedIn: true,
    points: 1540,
    username: "유디",
    unreadCount: 1,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const LoggedIn = {};

export const LoggedOut = {
  args: {
    isLoggedIn: false,
    points: 0,
    username: "",
    unreadCount: 0,
  },
};
