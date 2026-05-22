import React from 'react';
import RobotHeader from './RobotHeader';
import RobotFooter from './RobotFooter';

interface RobotLayoutProps {
  children: React.ReactNode;
}

const RobotLayout: React.FC<RobotLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <RobotHeader />
      <main>{children}</main>
      <RobotFooter />
    </div>
  );
};

export default RobotLayout;