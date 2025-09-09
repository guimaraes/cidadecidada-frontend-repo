import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// TIPOS_MANIFESTACAO e TIPO_COLORS são usados no Dashboard.tsx

interface TiposPieData {
  name: string;
  value: number;
  color: string;
}

interface TiposPieChartProps {
  data: TiposPieData[];
  loading?: boolean;
}

const TiposPieChart: React.FC<TiposPieChartProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="box box-success">
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-pie-chart text-success"></i> Distribuição por Tipo
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
      <div className="box box-success">
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-pie-chart text-success"></i> Distribuição por Tipo
          </h3>
        </div>
        <div className="box-body">
          <div className="text-center" style={{padding: '40px 0'}}>
            <i className="fa fa-chart-pie text-muted fa-2x"></i>
            <p className="text-muted">Nenhum dado disponível</p>
          </div>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="box box-success">
      <div className="box-header">
        <h3 className="box-title">
          <i className="fa fa-pie-chart text-success"></i> Distribuição por Tipo
        </h3>
      </div>
      <div className="box-body">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [value, 'Manifestações']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center" style={{marginTop: '10px'}}>
          <small className="text-muted">Total: {total} manifestações</small>
        </div>
      </div>
    </div>
  );
};

export default TiposPieChart;
