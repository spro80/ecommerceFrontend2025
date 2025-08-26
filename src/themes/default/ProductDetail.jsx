import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  return (
    <div>
      <h1>Product {id}</h1>
      <p>Product detail content.</p>
    </div>
  );
}