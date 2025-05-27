import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { mockservicedetails } from '../mock/servicedetail';

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const [currentName, setCurrentName] = useState<string>('');

  useEffect(() => {
    if (location.pathname.startsWith('/services/') && id) {
      fetch(`/opticbox/lenses/${id}/`)
        .then((res) => {
          if (!res.ok) throw new Error('Backend not available');
          return res.json();
        })
        .then((data) => setCurrentName(data.name))
        .catch(() => {
          const mock = mockservicedetails[id];
          setCurrentName(mock?.name || '');
        });
    }
  }, [id, location.pathname]);

  return (
    <Breadcrumb className="mt-4">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        Главная
      </Breadcrumb.Item>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        const label =
          value === id && currentName ? currentName : decodeURIComponent(value);

        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {label}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
            {label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
