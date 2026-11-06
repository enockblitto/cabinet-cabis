/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './views/HomePage';
import { AboutPage } from './views/AboutPage';
import { ActivitiesPage } from './views/ActivitiesPage';
import { ProjectsPage } from './views/ProjectsPage';
import { ContactsPage } from './views/ContactsPage';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectItem } from './utils/filterProjects';
import { PageLoader } from './components/PageLoader';
import { CompanyVideoButton } from './components/CompanyVideoButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [siteReady, setSiteReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [isVideoButtonExpanded, setIsVideoButtonExpanded] = useState(false);

  // Sync with window.location.hash for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'about', 'activities', 'projects', 'contacts'].includes(hash)) {
        setCurrentPage(hash);
        setSelectedProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProject(null);
    window.location.hash = page;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#474747] font-sans selection:bg-[#D94800] selection:text-white">
      {!loaderDone && <PageLoader onReveal={() => setSiteReady(true)} onFinish={() => setLoaderDone(true)} />}

      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main View */}
      <main key={currentPage} className="page-enter flex-1 w-full" id="main-content">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProject={handleOpenProject}
            siteReady={siteReady}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'activities' && (
          <ActivitiesPage
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage
            onOpenProject={handleOpenProject}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'contacts' && (
          <ContactsPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      <CompanyVideoButton pageLoaded={loaderDone} onExpandedChange={setIsVideoButtonExpanded} />
      <ScrollToTopButton isVideoExpanded={isVideoButtonExpanded} />

      {/* Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
