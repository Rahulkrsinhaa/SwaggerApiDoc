import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import TabNavigation from '../TabNavigationComponent/TabNavigation';
import DefineType from '../../pages/DefineType/DefineType';
import DefineEmitter from '../../pages/DefineEmitter/DefineEmitter';
import DefineCategory from '../../pages/DefineCategory/DefineCategory';
import DefineScope from '../../pages/DefineScope/DefineScope.js';
import '../../styles/Common.css';

const ConfigurationManagement = () => {
  return (
    <Layout>
      <div className="max-width-container">
          <h1 className="page-title">Configuration Management</h1>
        
        <TabNavigation />

        <Routes>
          <Route path="type" element={<DefineType />} />
          <Route path="emitter" element={<DefineEmitter />} />
          <Route path="category" element={<DefineCategory />} />
          <Route path="scope" element={<DefineScope />} />
        </Routes>
      </div>
    </Layout>
  );
};

export default ConfigurationManagement;