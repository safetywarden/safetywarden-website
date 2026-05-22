import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  data: object | object[];
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data];
  
  return (
    <Helmet>
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;