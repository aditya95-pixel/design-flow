import React from 'react'
import WorkspaceHeader from "./_components/WorkspaceHeader";
import Sidebar from './_components/Sidebar';
import { ThemeProvider } from '../../../context/ThemeContext';
function WorkspaceLayout({children}) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen dark:bg-gray-900 bg-rose-100">
        <WorkspaceHeader />
        <div className="flex flex-1 overflow-hidden pt-16"> {/* Added pt-16 for header spacing */}
          <Sidebar />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default WorkspaceLayout
