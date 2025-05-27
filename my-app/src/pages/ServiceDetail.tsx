import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import { mockservicedetails } from '../mock/servicedetail';
import type { Service } from '../types';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);  // ставим загрузку при изменении id
    setError(false);   // сбрасываем ошибку

    fetch(`/opticbox/lenses/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки');
        return res.json();
      })
      .then((data) => {
        setService(data.lens);
        setLoading(false);
      })
      .catch(() => {
        // fallback на mock-данные
        const fallback = mockservicedetails[id!];
        if (fallback) {
          setService(fallback);
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      });
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error || !service) return <Alert variant="danger">Ошибка загрузки данных</Alert>;

  return (
  <Container className="mt-4 d-flex justify-content-center">
    <Card className="w-100" style={{ maxWidth: '600px' }}>
      <Card.Img
        variant="top"
        src={service.image_url || 'https://via.placeholder.com/600x400?text=Нет+изображения'}
        style={{ width: '100%', height: 'auto' }}
      />
      <Card.Body className="px-3">
        <Card.Title>{service.name}</Card.Title>
        <Card.Text>
          <strong>Описание:</strong> {service.description}
          <br />
          <strong>Цена:</strong> {service.price} ₽
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
);

}
