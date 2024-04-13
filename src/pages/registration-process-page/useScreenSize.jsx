import { useState, useEffect } from 'react';

export function useScreenSize(conditionWidth) {
  const [matchesCondition, setMatchesCondition] = useState(false);

  useEffect(() => {
    function handleResize() {
      setMatchesCondition(window.innerWidth <= conditionWidth);
    }

    // Adiciona um event listener para monitorar o redimensionamento da tela
    window.addEventListener('resize', handleResize);

    // Verifica o tamanho da tela ao montar o componente
    handleResize();

    // Remove o event listener quando o componente é desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [conditionWidth]); // Re-executa o efeito quando a condição de largura muda

  return matchesCondition;
}
