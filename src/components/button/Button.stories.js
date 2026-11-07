import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      description: "버튼 색상 스타일",
      control: "select",
      options: ["primary", "secondary"],
    },
    size: {
      description: "버튼 너비",
      control: "select",
      options: ["responsive", "XS"],
    },
    thickness: {
      description: "버튼 높이 스타일",
      control: "select",
      options: ["thick", "thin"],
    },
    disabled: {
      description: "버튼 비활성화 여부",
      control: "boolean",
    },
    children: {
      description: "버튼에 표시할 내용",
      control: "text",
    },
  },
  args: {
    children: "버튼",
    variant: "primary",
    size: "reponsive",
    thickness: "thick",
    disabled: false,
  },
};

export default meta;

export const Primary = {};

export const Secondary = {
  args: {
    variant: "secondary",
  },
};

export const XS = {
  args: {
    size: "XS",
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};
