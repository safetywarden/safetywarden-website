import { useEffect } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  useEffect(() => {
    const jsonLd = Array.isArray(data) ? data : [data];
    const id = 'structured-data-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd);

    return () => {
      script?.remove();
    };
  }, [data]);

  return null;
};

export default StructuredData;
