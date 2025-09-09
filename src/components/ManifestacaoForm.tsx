import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Loader2 } from 'lucide-react';
import { NovaManifestacao } from '../types';
import { TIPOS_MANIFESTACAO } from '../utils/constants';

interface ManifestacaoFormProps {
  onSubmit: (data: NovaManifestacao) => Promise<void>;
  isLoading: boolean;
}

const ManifestacaoForm: React.FC<ManifestacaoFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NovaManifestacao>();

  const onFormSubmit = async (data: NovaManifestacao) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="nomeSolicitante">Nome Completo *</label>
            <input
              id="nomeSolicitante"
              type="text"
              className={`form-control ${errors.nomeSolicitante ? 'is-invalid' : ''}`}
              placeholder="Digite seu nome completo"
              {...register('nomeSolicitante', { 
                required: 'Nome é obrigatório',
                minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
              })}
            />
            {errors.nomeSolicitante && (
              <div className="invalid-feedback">{errors.nomeSolicitante.message}</div>
            )}
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="email">E-mail *</label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="seu@email.com"
              {...register('email', { 
                required: 'E-mail é obrigatório',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'E-mail inválido'
                }
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="telefone">Telefone *</label>
            <input
              id="telefone"
              type="tel"
              className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
              placeholder="(11) 99999-9999"
              {...register('telefone', { 
                required: 'Telefone é obrigatório',
                pattern: {
                  value: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
                  message: 'Telefone inválido'
                }
              })}
            />
            {errors.telefone && (
              <div className="invalid-feedback">{errors.telefone.message}</div>
            )}
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="tipo">Tipo de Manifestação *</label>
            <select
              id="tipo"
              className={`form-control ${errors.tipo ? 'is-invalid' : ''}`}
              {...register('tipo', { required: 'Tipo é obrigatório' })}
            >
              <option value="">Selecione o tipo</option>
              {Object.entries(TIPOS_MANIFESTACAO).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.tipo && (
              <div className="invalid-feedback">{errors.tipo.message}</div>
            )}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endereco">Endereço Completo *</label>
        <input
          id="endereco"
          type="text"
          className={`form-control ${errors.endereco ? 'is-invalid' : ''}`}
          placeholder="Rua, número, bairro, cidade, CEP"
          {...register('endereco', { 
            required: 'Endereço é obrigatório',
            minLength: { value: 10, message: 'Endereço deve ter pelo menos 10 caracteres' }
          })}
        />
        {errors.endereco && (
          <div className="invalid-feedback">{errors.endereco.message}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="assunto">Assunto da Manifestação *</label>
        <input
          id="assunto"
          type="text"
          className={`form-control ${errors.assunto ? 'is-invalid' : ''}`}
          placeholder="Digite um título descritivo para sua manifestação"
          {...register('assunto', { 
            required: 'Assunto é obrigatório',
            minLength: { value: 5, message: 'Assunto deve ter pelo menos 5 caracteres' },
            maxLength: { value: 200, message: 'Assunto deve ter no máximo 200 caracteres' }
          })}
        />
        {errors.assunto && (
          <div className="invalid-feedback">{errors.assunto.message}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="descricao">Descrição Detalhada *</label>
        <textarea
          id="descricao"
          className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
          placeholder="Descreva detalhadamente sua manifestação..."
          rows={5}
          {...register('descricao', { 
            required: 'Descrição é obrigatória',
            minLength: { value: 20, message: 'Descrição deve ter pelo menos 20 caracteres' },
            maxLength: { value: 1000, message: 'Descrição deve ter no máximo 1000 caracteres' }
          })}
        />
        {errors.descricao && (
          <div className="invalid-feedback">{errors.descricao.message}</div>
        )}
      </div>

      <div className="form-group">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="loading" />
              Enviando...
            </>
          ) : (
            <>
              <Plus size={16} />
              Enviar Manifestação
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ManifestacaoForm;
