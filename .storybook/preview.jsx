import * as theme from "@/styles/theme.css";
import { useEffect } from "react";

function ThemeWrapper({ children }) {
  useEffect(() => {
    document.body.classList.add(theme.themeClass);
    return () => document.body.classList.remove(theme.themeClass);
  }, []);

  return <div className={theme.themeClass}>{children}</div>;
}

const preview = {
  decorators: [
    (Story) => (
      <div className={theme.themeClass}>
        <ThemeWrapper>
          <Story />
        </ThemeWrapper>
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
