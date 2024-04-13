import { useEffect, useState } from 'react';
import StepProgress from '../../components/StepProgress';
import StepCompletion from '../../components/StepCompletion';
import './style.css';
import { useScreenSize } from './useScreenSize';
import './style.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegistrationProcessPage = () => {
  const [parts, setParts] = useState(['']);
  const [responsibleClerk, setResponsibleClerk] = useState('');
  const [protocol, setProtocol] = useState('');
  const [progress, setProgress] = useState({
    currentStep: 0,
    items: [],
  });

  const breakSteps = useScreenSize(985);
  const isMaxProgress = progress.currentStep === progress.items.length;
  const [dataReceived, setDataReceived] = useState(false);
  const [loading, setLoading] = useState(true);

  const setItens = (_data) => {
    let _item = [
      [
        {
          title: 'Análise',
          description: _data?.data_abertura
            ? formatDate(_data.data_abertura)
            : null,
        },
        {
          title: 'Digitação',
          description: _data?.data_digitacao
            ? formatDate(_data.data_digitacao)
            : null,
        },
        {
          title: 'Assinatura',
          description: _data?.data_lavratura
            ? formatDate(_data.data_lavratura)
            : null,
        },
        {
          title: 'Imobiliária',
          description: _data?.data_imobiliaria
            ? formatDate(_data.data_imobiliaria)
            : null,
        },
        {
          title: 'Avaliação',
          description: _data?.data_prefeitura
            ? formatDate(_data.data_prefeitura)
            : null,
        },
        {
          title: 'Registro',
          description: _data?.data_registro
            ? formatDate(_data.data_registro)
            : null,
        },
        {
          title: 'Conclusão',
          description: _data?.data_disponivel
            ? formatDate(_data.data_disponivel)
            : null,
        },
        {
          title: 'Entrega',
          description: _data?.data_entrega
            ? formatDate(_data.data_entrega)
            : null,
        },
      ],
      [
        {
          title: 'Análise',
          description: _data?.data_abertura
            ? formatDate(_data.data_abertura)
            : null,
        },
        {
          title: 'Aguard. Advogado',
          description: _data?.data_aguardandoadvogado
            ? formatDate(_data.data_aguardandoadvogado)
            : null,
        },
        {
          title: 'Digitação',
          description: _data?.data_digitacao
            ? formatDate(_data.data_digitacao)
            : null,
        },
        {
          title: 'Assinatura',
          description: _data?.data_lavratura
            ? formatDate(_data.data_lavratura)
            : null,
        },
        {
          title: 'Conclusão',
          description: _data?.data_disponivel
            ? formatDate(_data.data_disponivel)
            : null,
        },
        {
          title: 'Entrega',
          description: _data?.data_entrega
            ? formatDate(_data.data_entrega)
            : null,
        },
      ],
    ];

    const currentItemEscritura = _item[0].findLastIndex(
      ({ description }) => description,
    );
    const currentItemDivorcio = _item[1].findLastIndex(
      ({ description }) => description,
    );

    return {
      currentStep:
        _data.tipo === 'ESCRITURA' ? currentItemEscritura : currentItemDivorcio,
      tipo: _data.tipo,
      items: _item[_data.tipo === 'ESCRITURA' ? 0 : 1],
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const payload = sessionStorage.getItem('session');
      if (!payload) return;
      setLoading(true);

      try {
        const response = await fetch(
          'https://app.viromatecnologia.com.br:3333/protocol',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: payload,
          },
        );

        if (!response.ok) {
          throw new Error('Erro ao enviar os dados.');
        }

        const data = await response.json().then((res) => res[0]);

        setParts(
          [data.nome_primeiro_outorgado, data.nome_primeiro_outorgante].filter(
            Boolean,
          ),
        );
        setResponsibleClerk(data.nome_escrevente_responsavel);
        setProtocol(data.protocolo);

        let _items = setItens(data);
        console.log(_items, 'items');
        setProgress(_items);
        setDataReceived(true);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return null;

    let _new =
      dateString?.substring(8, 10) +
      '/' +
      dateString?.substring(5, 7) +
      '/' +
      dateString?.substring(0, 4);
    return _new;
  };

  if (!dataReceived) {
    return (
      <div className="loading-spinner">
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  }

  return (
    <div className="container-registration">
      <div className="registration-box">
        <header className="registration-header">
          <p>
            <strong>PROTOCOLO: </strong>
            {protocol}
          </p>
          <p>
            <strong>PARTE: </strong>
            {parts.map((part, index) => {
              if (parts.length - 1 === index) {
                return (
                  <span key={index} className="each-part">
                    {part}
                  </span>
                );
              }
              return (
                <span key={index} className="each-part">
                  {part} |
                </span>
              );
            })}
          </p>
          <p>
            <strong>ESCREVENTE RESPONSÁVEL: </strong>
            {responsibleClerk}
          </p>
        </header>
        <hr className="registration-hr" />
        <div className="steps-container">
          {isMaxProgress ? (
            <StepCompletion receivedDate={''} />
          ) : (
            progress && (
              <StepProgress
                direction={breakSteps ? 'vertical' : 'horizontal'}
                currentStep={progress.currentStep}
                process={progress.tipo}
                states={progress.items}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationProcessPage;
