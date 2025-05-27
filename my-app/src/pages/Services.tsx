import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Service } from '../types';
import { mockServices } from '../mock/services';
import './Services.css';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { setSearchText, setMaxPrice } from '../store/filterSlice';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  const searchText = useSelector((state: RootState) => state.filter.searchText);
  const maxPrice = useSelector((state: RootState) => state.filter.maxPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchText) params.append('search-lenses', searchText);
    if (maxPrice) params.append('price-lte', String(maxPrice));

    fetch(`/opticbox/lenses/?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Backend not available');
        return res.json();
      })
      .then((data) => setServices(data.lenses))
      .catch(() => setServices(mockServices));
  }, [searchText, maxPrice]);

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase()) &&
      Number(s.price) <= maxPrice
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Линзы</h2>

      <Form className="mb-4 d-flex flex-column align-items-center gap-2">
        <Form.Control
          type="text"
          placeholder="Поиск по названию"
          style={{ maxWidth: '400px' }}
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <Form.Range
          min={0}
          max={100000}
          step={1000}
          value={maxPrice}
          onChange={(e) => dispatch(setMaxPrice(Number(e.target.value)))}
          style={{ maxWidth: '400px' }}
        />
        <div>Макс. цена: <strong>{maxPrice} ₽</strong></div>
      </Form>

      <div className="cards__wrapper justify-content-center">
        {filtered.map((service) => (
          <div className="card__item" key={service.id}>
            <div className="card__img">
              <img
                src={service.image_url || 'https://via.placeholder.com/300x200?text=Нет+изображения'}
                alt={service.name}
              />
            </div>
            <div className="card__info">
              <div className="card__text">
                <div className="card__title">{service.name}</div>
                <div className="card__description">{service.description}</div>
                <div className="card__price"><strong>{service.price} ₽</strong></div>
              </div>
              <Link to={`/services/${service.id}`} className="btn btn-primary mt-2">Подробнее</Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
