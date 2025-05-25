
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Service } from '../types';
import { mockServices } from '../mock/services';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
  const params = new URLSearchParams();
  if (searchText) params.append('search-lenses', searchText);

  fetch(`/opticbox/lenses/?${params.toString()}`)
    .then((res) => {
      if (!res.ok) throw new Error('Backend not available');
      return res.json();
    })
    .then((data) => setServices(data.lenses))
    .catch(() => setServices(mockServices));
}, [searchText]);


  return (
    <Container className="mt-4">
      <h2></h2>

      <Form className="mb-4 d-flex justify-content-center">
        <Form.Control
          type="text"
          placeholder="Поиск линз"
          style={{ maxWidth: '400px' }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form>

      <Row>
  {services.map((service) => (
    <Col md={4} key={service.id} className="mb-4">
      <Card>
        <Card.Img
          variant="top"
          src={service.image_url || 'https://via.placeholder.com/300x200?text=Нет+изображения'}
          style={{ height: '200px', objectFit: 'cover' }} // <--- Вот это добавь
        />

        <Card.Body>
          <Card.Title>{service.name}</Card.Title> {/* имя из API */}
          <Card.Text>
            {service.description}
            <br />
            <strong>Цена:</strong> {service.price} ₽
          </Card.Text>
          <Link to={`/services/${service.id}`} className="btn btn-primary">
            Подробнее
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

    </Container>
  );
}