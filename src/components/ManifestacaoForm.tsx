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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome */}
        <div className="form-group">
          <label htmlFor="nomeSolicitante" className="form-label">
            Nome Completo *
          </label>
          <input
            id="nomeSolicitante"
            type="text"
            className={`form-input ${errors.nomeSolicitante ? 'border-red-500' : ''}`}
            placeholder="Digite seu nome completo"
            {...register('nomeSolicitante', { 
              required: 'Nome é obrigatório',
              minLength: { value: 3, message: 'Nome deve ter pelo menos 3 caracteres' }
            })}
          />
          {errors.nomeSolicitante && (
            <span className="text-red-500 text-sm mt-1">{errors.nomeSolicitante.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
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
            <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
          )}
        </div>

        {/* Telefone */}
        <div className="form-group">
          <label htmlFor="telefone" className="form-label">
            Telefone *
          </label>
          <input
            id="telefone"
            type="tel"
            className={`form-input ${errors.telefone ? 'border-red-500' : ''}`}
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
            <span className="text-red-500 text-sm mt-1">{errors.telefone.message}</span>
          )}
        </div>

        {/* Tipo */}
        <div className="form-group">
          <label htmlFor="tipo" className="form-label">
            Tipo de Manifestação *
          </label>
          <select
            id="tipo"
            className={`form-select ${errors.tipo ? 'border-red-500' : ''}`}
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
            <span className="text-red-500 text-sm mt-1">{errors.tipo.message}</span>
          )}
        </div>
      </div>

      {/* Endereço */}
      <div className="form-group">
        <label htmlFor="endereco" className="form-label">
          Endereço *
        </label>
        <input
          id="endereco"
          type="text"
          className={`form-input ${errors.endereco ? 'border-red-500' : ''}`}
          placeholder="Rua, número, bairro, cidade"
          {...register('endereco', { 
            required: 'Endereço é obrigatório',
            minLength: { value: 10, message: 'Endereço deve ter pelo menos 10 caracteres' }
          })}
        />
        {errors.endereco && (
          <span className="text-red-500 text-sm mt-1">{errors.endereco.message}</span>
        )}
      </div>

      {/* Assunto */}
      <div className="form-group">
        <label htmlFor="assunto" className="form-label">
          Assunto *
        </label>
        <input
          id="assunto"
          type="text"
          className={`form-input ${errors.assunto ? 'border-red-500' : ''}`}
          placeholder="Digite o assunto da manifestação"
          {...register('assunto', { 
            required: 'Assunto é obrigatório',
            minLength: { value: 5, message: 'Assunto deve ter pelo menos 5 caracteres' },
            maxLength: { value: 200, message: 'Assunto deve ter no máximo 200 caracteres' }
          })}
        />
        {errors.assunto && (
          <span className="text-red-500 text-sm mt-1">{errors.assunto.message}</span>
        )}
      </div>

      {/* Descrição */}
      <div className="form-group">
        <label htmlFor="descricao" className="form-label">
          Descrição da Manifestação *
        </label>
        <textarea
          id="descricao"
          className={`form-textarea ${errors.descricao ? 'border-red-500' : ''}`}
          placeholder="Descreva detalhadamente sua manifestação..."
          rows={5}
          {...register('descricao', { 
            required: 'Descrição é obrigatória',
            minLength: { value: 20, message: 'Descrição deve ter pelo menos 20 caracteres' },
            maxLength: { value: 1000, message: 'Descrição deve ter no máximo 1000 caracteres' }
          })}
        />
        {errors.descricao && (
          <span className="text-red-500 text-sm mt-1">{errors.descricao.message}</span>
        )}
      </div>

      {/* Botão de Envio */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="loading" />
              Enviando...
            </>
          ) : (
            <>
              <Plus size={20} />
              Enviar Manifestação
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ManifestacaoForm;
