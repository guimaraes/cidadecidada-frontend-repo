import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SlaBucketData {
  faixa: string;
  quantidade: number;
  cor: string;
}

interface SlaBucketsBarProps {
  data: SlaBucketData[];
  loading?: boolean;
}

const SlaBucketsBar: React.FC<SlaBucketsBarProps> = ({ data, loading = false }) => {
  if (loading) {
    return (
      <div className="box box-warning">
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-bar-chart text-warning"></i> Abertas por Faixa de Idade (SLA)
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
      <div className="box box-warning">
        <div className="box-header">
          <h3 className="box-title">
            <i className="fa fa-bar-chart text-warning"></i> Abertas por Faixa de Idade (SLA)
          </h3>
        </div>
        <div className="box-body">
          <div className="text-center" style={{padding: '40px 0'}}>
            <i className="fa fa-chart-bar text-muted fa-2x"></i>
            <p className="text-muted">Nenhum dado disponível</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="box box-warning">
      <div className="box-header">
        <h3 className="box-title">
          <i className="fa fa-bar-chart text-warning"></i> Abertas por Faixa de Idade (SLA)
        </h3>
      </div>
      <div className="box-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={data}
            layout="horizontal"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis 
              type="category" 
              dataKey="faixa" 
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip 
              formatter={(value: number) => [value, 'Manifestações']}
              labelFormatter={(label) => `Faixa: ${label}`}
            />
            <Bar dataKey="quantidade" fill="#ffc107">
              {data.map((entry, index) => (
                <Bar key={`bar-${index}`} fill={entry.cor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="text-center" style={{marginTop: '10px'}}>
          <small className="text-muted">
            Total: {data.reduce((sum, item) => sum + item.quantidade, 0)} manifestações abertas
          </small>
        </div>
      </div>
    </div>
  );
};

export default SlaBucketsBar;
