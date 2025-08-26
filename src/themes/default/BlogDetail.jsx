import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogDetail() {
  const { id } = useParams();
  return (
    <div>
      <h1>Blog {id}</h1>
      <p>Blog detail placeholder.</p>
    </div>
  );
}