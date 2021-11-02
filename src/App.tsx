import './styles/global.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Routes from './routes';
import { LeadProvider } from './context/leadContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <LeadProvider>
        <Routes />
      </LeadProvider>
    </DndProvider>
  );
}

export default App;
