import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProgressProvider } from './state/ProgressContext';
import { SettingsProvider } from './state/SettingsContext';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { LessonView } from './pages/LessonView';
import { MilestoneView } from './pages/MilestoneView';
import { Practice } from './pages/Practice';
import { Tools } from './pages/Tools';
import { Glossary } from './pages/Glossary';
import { ProgressPage } from './pages/ProgressPage';

export default function App() {
  return (
    <SettingsProvider>
      <ProgressProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:tierId/milestone" element={<MilestoneView />} />
              <Route path="/learn/:tierId/:lessonId" element={<LessonView />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </Layout>
        </HashRouter>
      </ProgressProvider>
    </SettingsProvider>
  );
}
