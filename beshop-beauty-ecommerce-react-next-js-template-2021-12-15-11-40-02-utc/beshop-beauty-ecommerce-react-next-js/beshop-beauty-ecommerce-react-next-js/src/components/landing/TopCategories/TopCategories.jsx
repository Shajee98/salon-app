import axios from 'axios';
import { Categories } from 'components/Category/Categories/Categories';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import { useEffect, useState } from 'react';
// import categoriesData from 'data/category/category';

export const TopCategories = () => {

  const [staffs, setStaffs] = useState([])

  useEffect(async() => {
    const staff = await getStaffs();
    setStaffs(staff) 
  },[])
  const categories = staffs.slice(0, 3);
  console.log(categories)

  const getStaffs = async () => {
    const {data: {staffs}} = await axios.get('http://localhost:4000/salon/get_staffs');
    console.log(staffs)
    return staffs
  }
  return (
    <>
      {/* <!-- BEGIN TOP CATEGORIES --> */}
      <section className='top-categories'>
        <SectionTitle
          subTitle='Popular collections'
          title='top categories'
          body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
        />
        <div className='top-categories__items'>
          {<Categories categories={categories} />}
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF   --> */}
    </>
  );
};
