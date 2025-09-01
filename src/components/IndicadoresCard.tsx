import React from 'react';
import { Indicadores } from '../types';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Calendar,
  Archive
} from 'lucide-react';

interface IndicadoresCardProps {
  indicadores: Indicadores;
}

const IndicadoresCard: React.FC<IndicadoresCardProps> = ({ indicadores }) => {
  const cards = [
    {
      title: 'Total',
      value: indicadores.total,
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Abertas',
      value: indicadores.abertas,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Em Análise',
      value: indicadores.emAnalise,
      icon: TrendingUp,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Em Andamento',
      value: indicadores.emAndamento,
      icon: TrendingUp,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    },
    {
      title: 'Resolvidas',
      value: indicadores.resolvidas,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Canceladas',
      value: indicadores.canceladas,
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      title: 'Arquivadas',
      value: indicadores.arquivadas,
      icon: Archive,
      color: 'bg-gray-500',
      textColor: 'text-gray-600'
    },
    {
      title: 'Hoje',
      value: indicadores.hoje,
      icon: Calendar,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Indicadores</h2>
        <p className="text-gray-600 text-sm">
          Visão geral das manifestações
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
        {cards.map((card) => (
          <div key={card.title} className="text-center p-4 bg-gray-50 rounded-lg">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${card.color} mb-3`}>
              <card.icon size={24} className="text-white" />
            </div>
            <div className={`text-2xl font-bold ${card.textColor} mb-1`}>
              {card.value}
            </div>
            <div className="text-sm text-gray-600">
              {card.title}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Por Tipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.entries(indicadores.porTipo).map(([tipo, quantidade]) => (
            <div key={tipo} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                {tipo.charAt(0) + tipo.slice(1).toLowerCase()}
              </span>
              <span className="text-lg font-bold text-blue-600">
                {quantidade}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndicadoresCard;
