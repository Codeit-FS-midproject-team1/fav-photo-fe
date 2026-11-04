import * as theme from "@/styles/theme.css";

const preview = {
  decorators: [
    (Story) => (
      <div className={theme.themeClass}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
