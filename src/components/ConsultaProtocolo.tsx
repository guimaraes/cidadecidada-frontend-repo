import React from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Manifestacao } from '../types';
import { manifestacaoService } from '../services/api';
import toast from 'react-hot-toast';

interface ConsultaFormData {
  protocolo: string;
}

interface ConsultaProtocoloProps {
  onManifestacaoFound: (manifestacao: Manifestacao) => void;
}

const ConsultaProtocolo: React.FC<ConsultaProtocoloProps> = ({ onManifestacaoFound }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultaFormData>();

  const onSubmit = async (data: ConsultaFormData) => {
    setIsLoading(true);
    try {
      const manifestacao = await manifestacaoService.buscarPorProtocolo(data.protocolo);
      onManifestacaoFound(manifestacao);
      toast.success('Manifestação encontrada!');
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error('Protocolo não encontrado. Verifique o número e tente novamente.');
      } else {
        toast.error('Erro ao consultar protocolo. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="protocolo">Número do Protocolo *</label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-search"></i>
          </span>
          <InputMask
            mask="PROT9999-9999999999"
            maskChar="_"
            alwaysShowMask={false}
            {...register('protocolo', { 
              required: 'Protocolo é obrigatório',
              pattern: {
                value: /^PROT\d{4}-\d{10}$/,
                message: 'Formato inválido. Use: PROTAAAA-NNNNNNNNNN'
              }
            })}
          >
            {(inputProps: any) => (
              <input
                {...inputProps}
                id="protocolo"
                type="text"
                className={`form-control ${errors.protocolo ? 'is-invalid' : ''}`}
                placeholder="PROT____-__________"
              />
            )}
          </InputMask>
        </div>
        {errors.protocolo ? (
          <div className="invalid-feedback">{errors.protocolo.message}</div>
        ) : (
          <p className="help-block">
            Digite o protocolo no formato: PROT + ano + hífen + número
          </p>
        )}
      </div>


      <div className="form-group">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary btn-block"
        >
          {isLoading ? (
            <>
              <i className="fa fa-spinner fa-spin"></i> Consultando...
            </>
          ) : (
            <>
              <i className="fa fa-search"></i> Consultar Protocolo
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ConsultaProtocolo;
