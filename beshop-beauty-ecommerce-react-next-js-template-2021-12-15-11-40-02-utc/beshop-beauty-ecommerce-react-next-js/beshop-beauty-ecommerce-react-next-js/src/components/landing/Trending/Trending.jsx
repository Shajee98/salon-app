import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
// import productData from 'data/product/product';
import axios from 'axios';

export const Trending = () => {
  // const trendingProducts = [...productData];
  const [services, setServices] = useState([]);
  // const [filterItem, setFilterItem] = useState('makeup');

  useEffect(() => {
    // const newItems = trendingProducts.filter((pd) =>
    //   pd.filterItems.includes(filterItem)
    // );
    // setProducts(newItems);
    getServices()
  }, []);

  const filterList = [
    {
      name: 'Make Up',
      value: 'makeup',
    },
    {
      name: 'SPA',
      value: 'spa',
    },
    {
      name: 'Perfume',
      value: 'perfume',
    },
    {
      name: 'Nails',
      value: 'nail',
    },
    {
      name: 'Skin care',
      value: 'skin',
    },
    {
      name: 'Hair care',
      value: 'hair',
    },
  ];

  function getServices() {
    axios.get('http://localhost:4000/salon/get_services').then((data) => {
      const services = data.data.services
      setServices(services)
      // console.log(services)
    },(err) => {
      console.log(err)
    })
  }

  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className='trending'>
        <div className='trending-content'>
          <SectionTitle
            subTitle=''
            title='Services'
            body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
          />
          <div className='tab-wrap trending-tabs'>
            {/* <ul className='nav-tab-list tabs'>
              {filterList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => setFilterItem(item.value)}
                  className={item.value === filterItem ? 'active' : ''}
                >
                  {item.name}
                </li>
              ))}
            </ul> */}
            <div className='products-items'>
              <ProductsCarousel products={services} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
