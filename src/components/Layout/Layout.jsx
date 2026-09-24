import React, { useState, createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import './Layout.css'

const LayoutContext = createContext({})
export const useLayout = () => useContext(LayoutContext)

export default function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev)
  const toggleMobile = () => setMobileOpen(prev => !prev)

  return (
    <LayoutContext.Provider value={{ sidebarCollapsed, toggleSidebar }}>
      <div className={`layout ${sidebarCollapsed ? 'layout--collapsed' : ''}`}>
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="layout__overlay"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <Sidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div className="layout__main">
          <Header
            onToggleSidebar={toggleSidebar}
            onToggleMobile={toggleMobile}
            collapsed={sidebarCollapsed}
          />
          <main className="layout__content">
            <Outlet />
          </main>
        </div>
      </div>
    </LayoutContext.Provider>
  )
}

