import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SerieDiariaData {
  data: string;
  total: number;
}

interface SerieDiariaChartProps {
  data: SerieDiariaData[];
  loading?: boolean;
}

const SerieDiariaChart: React.FC<SerieDiariaChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="box box-info">
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-line-chart text-info"></i> Manifestações por Dia (Últimos 30 dias)
          </h3>
        </div>
        <div className="box-body">
          <div className="text-center" style={{padding: '40px 0'}}>
            <i className="fa fa-spinner fa-spin fa-2x text-muted"></i>
            <p className="text-muted">Carregando dados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="box box-info">
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-line-chart text-info"></i> Manifestações por Dia (Últimos 30 dias)
          </h3>
        </div>
        <div className="box-body">
          <div className="text-center" style={{padding: '40px 0'}}>
            <i className="fa fa-chart-line text-muted fa-2x"></i>
            <p className="text-muted">Nenhum dado disponível</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="box box-info">
      <div className="box-header">
        <h3 className="box-title">
          <i className="fa fa-line-chart text-info"></i> Manifestações por Dia (Últimos 30 dias)
        </h3>
      </div>
      <div className="box-body">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="data" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              labelFormatter={(value) => `Data: ${value}`}
              formatter={(value: number) => [value, 'Manifestações']}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#007bff" 
              strokeWidth={2}
              dot={{ fill: '#007bff', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#007bff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SerieDiariaChart;
