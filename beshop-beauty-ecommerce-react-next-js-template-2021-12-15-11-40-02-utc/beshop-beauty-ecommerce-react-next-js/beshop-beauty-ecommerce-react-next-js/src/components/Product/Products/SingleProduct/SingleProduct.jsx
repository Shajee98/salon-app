import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';


export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
}) => {
  const { name, oldPrice, price, image, isSale, isNew, id, staffs } = product;
  const [showModal, setModalShow] = useState(false)
  const [is_staff_selected, setIsStaffSelected] = useState(false)
  const [staff_available_slots, setStaffAvailableSlot] = useState([])
  const [selected_staff,setSelectedStaff] = useState('')
  const [selected_slot,setSelectedSlot] = useState({})
  const [dates, setDates] = useState([])

  // useEffect(async() => {
  //   const slots = await getSlots()
  //   setStaffAvailableSlot(slots)
  //   console.log(staff_available_slots)
  // },[selectedStaff])

  const setSlot = (day, slot) => {
    localStorage.setItem("day", day)
    localStorage.setItem("slot", slot)
  }

  const getSlots = async (staff) => {
    localStorage.setItem("service_name", name)
    localStorage.setItem("price", price)
    localStorage.setItem("staff", staff)
    const data = await axios.get('http://localhost:4000/salon/staff/get_available_slot',{headers: {staff: staff}});
    const date = new Date();
    // const next_week = date.getDate() + 7
    // data.data.slots.forEach((slot,i) => {
    //   const next_date = date.getDate() + i + 1
    //   for (let index = 1; index <= data.data.slots.length(); index++) {
    //    const next_date = date.getDay()
        
    //   }
    // })
    // console.log(next_week)
    setIsStaffSelected(true)
    setStaffAvailableSlot(data.data.slots)
    console.log(data)
  }

  const onModalClose = () => {
    setIsStaffSelected(false);
    setModalShow(false)
  }
  
  return (
    <>
      <PureModal
  width='1000px'    
  header={`${name}`}
  footer={
    <div style={{display: 'flex',flexDirection: 'row'}}>
      <Link href='/shop'>
        <a className='btn' style={{marginRight: '20px'}} onClick={() => onModalClose()}>Cancel</a>
      </Link>
      <Link href='/shop'>
        <a className='btn'>Save</a>
      </Link>
    </div>
  }
  isOpen={showModal}
  onClose={() => {
    setModalShow(false);
    return true;
  }}
>
  <section>
  <p className='shop-aside__item-title'>Select Staff</p>
  {showModal ? staffs.map((staff) => 
     <a className='btn' style={{marginRight: '10px',cursor: 'pointer'}} onClick={() => getSlots(staff)}>{staff}</a>
  ) : null}
  </section>
  <br />
  <section>
  <p className='shop-aside__item-title'>Select Slot</p>
  <div style={{display: 'flex', flexDirection: 'row'}}>
  {is_staff_selected == true ? 
  staff_available_slots.map(({day,slot}) =>
            <div style={{display: 'flex', flexDirection: 'column'}}>
         <a className='btn' style={{marginRight: '10px',cursor: 'pointer',textAlign: 'center'}} onClick={() => setSlot(day, slot)}>{slot}</a>
         <span style={{alignSelf: 'center'}}>{day}</span>
         </div>
  ) 
  : <span>No Staff Selected</span>}
  </div>
  </section>
</PureModal>
      <div className='products-item'>
        <div className='products-item__type'>
          {isSale && <span className='products-item__sale'>sale</span>}
          {isNew && <span className='products-item__new'>new</span>}
        </div>
        <div className='products-item__img'>
          <img src={image} className='js-img' alt='' />
          <div className='products-item__hover'>
            {/* <Link href={`/product/${id}`}> */}
              <a >
                <i onClick={() => setModalShow(true)} className='icon-search'></i>
              </a>
            {/* </Link> */}
            <div className='products-item__hover-options'>
              <button className='addList' onClick={() => onAddToWish(id)}>
                <i className='icon-heart'></i>
              </button>
              <button
                disabled={addedInCart}
                className={`addList ${addedInCart ? 'added' : ''}`}
                onClick={() => onAddToCart(id)}
              >
                <i className='icon-cart'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='products-item__info'>
          <Link href={`/product/${id}`}>
            <a>
              <span className='products-item__name'>{name}</span>
            </a>
          </Link>
          <span className='products-item__cost'>
            <span>{oldPrice && `$${oldPrice}`}</span> ${price}
          </span>
        </div>
      </div>
      {/* </div> */}
      {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
    </>
  );
};
