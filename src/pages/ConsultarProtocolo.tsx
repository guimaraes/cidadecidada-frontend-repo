import React from 'react';
import { Manifestacao } from '../types';
import ConsultaProtocolo from '../components/ConsultaProtocolo';
import ManifestacaoCard from '../components/ManifestacaoCard';

const ConsultarProtocoloPage: React.FC = () => {
  const [manifestacao, setManifestacao] = React.useState<Manifestacao | null>(null);

  const handleManifestacaoFound = (manifestacao: Manifestacao) => {
    setManifestacao(manifestacao);
  };

  const handleNovaConsulta = () => {
    setManifestacao(null);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        {/* Consulta Box */}
        <div className="box box-primary">
          <div className="box-header">
            <h3 className="box-title">Consultar Manifestação</h3>
            <div className="box-tools pull-right">
              <span className="label label-primary">Consulta Rápida</span>
            </div>
          </div>
          <div className="box-body">
            {manifestacao ? (
              <div>
                {/* Results Header */}
                <div className="alert alert-success alert-dismissible">
                  <button 
                    type="button" 
                    className="close" 
                    onClick={handleNovaConsulta}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#3c763d',
                      padding: '0',
                      margin: '0',
                      cursor: 'pointer',
                      lineHeight: '1',
                      opacity: '0.7',
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
                    title="Fechar e fazer nova consulta"
                  >
                    <i className="fa fa-times-circle"></i>
                  </button>
                  <h4><i className="icon fa fa-check"></i> Manifestação Encontrada!</h4>
                  Aqui estão os detalhes da sua manifestação.
                </div>
                
                <ManifestacaoCard manifestacao={manifestacao} />
              </div>
            ) : (
              <ConsultaProtocolo onManifestacaoFound={handleManifestacaoFound} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConsultarProtocoloPage;
