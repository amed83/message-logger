import './App.css';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
// const theme = {
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
// };
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
