import UnderConstruction from "./components/under-construction";
import { ThemeProvider } from "./components/theme-provider";
import ThemeToggle from "./components/theme-toggle";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <UnderConstruction />
    </ThemeProvider>
  );
}
