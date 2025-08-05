import { NavLink } from 'react-router-dom';
import './TabNavigation.css';

const tabs = [
  { id: 'emitter', label: 'Define Carbon Emitter' },
  { id: 'category', label: 'Define Category' },
  { id: 'scope', label: 'Define Scope' },
  { id: 'type', label: 'Define Type' }
];

const TabNavigation = () => (
  <div className="tab-container">
    {tabs.map((tab) => (
      <NavLink
        key={tab.id}
        to={`/${tab.id}`}
        className={({ isActive }) =>
          `tab-button ${isActive ? 'active' : ''}`
        }
      >
        {tab.label}
      </NavLink>
    ))}
  </div>
);

export default TabNavigation;
