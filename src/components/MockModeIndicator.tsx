import React from 'react';
import { Database } from 'lucide-react';

const MockModeIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 shadow-lg z-50">
      <div className="flex items-center gap-2">
        <Database size={16} className="text-yellow-600" />
        <span className="text-sm font-medium text-yellow-800">
          Modo Demonstração
        </span>
      </div>
      <p className="text-xs text-yellow-700 mt-1">
        Usando dados de exemplo
      </p>
    </div>
  );
};

export default MockModeIndicator;
