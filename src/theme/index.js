import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5" // indigo
    },
    secondary: {
      main: "#06B6D4" // cyan
    },
    success: {
      main: "#16A34A"
    },
    warning: {
      main: "#F59E0B"
    },
    error: {
      main: "#DC2626"
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF"
    }
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 }
  }
});

export default theme;
