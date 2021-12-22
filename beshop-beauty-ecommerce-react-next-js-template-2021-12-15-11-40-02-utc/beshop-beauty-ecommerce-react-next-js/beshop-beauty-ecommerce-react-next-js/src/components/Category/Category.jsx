// import categoryData from 'data/category/category';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Categories } from './Categories/Categories';

export const Category = () => {

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
      <section className='all-categories'>
        <div className='top-categories__items'>
          <Categories categories={staffs} />
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF --> */}
    </>
  );
};
