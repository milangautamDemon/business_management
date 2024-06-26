import { useState } from "react";
import Map from './Map';
import { v4 as uuidv4 } from 'uuid';
import { RxCross2 } from 'react-icons/rx';

const generateuniqueId = () => {
  return uuidv4();
}

const BusinessAddModal = ({ businessAddModalIsOpen, setBusinessAddModalIsOpen, handleAddBusiness }) => {

    const [ businessName, setBusinessName ] = useState("");
    const [ businessDate, setBusinessDate ] = useState("");
    const [ markerCoords, setMarkerCoords ] = useState({
        lat: 27.678762, 
        lng: 85.349538,
    });

    const handleBusinessNameChange = (e) => {
        setBusinessName(e.target.value);
    }

    const handleBusinessDateChange = (e) => {
        setBusinessDate(e.target.value);
    }
    
    const onClose = () => {
        setBusinessAddModalIsOpen(false);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
         id: generateuniqueId(),
         name: businessName,
         createdOn: businessDate,
         location: markerCoords,
      };
     const dateRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

     if (!dateRegex.test(businessDate)) {
      alert('Invalid date format');
     }
     else {
        try {
          const response = await fetch('http://localhost:5000/api/datas', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Failed to insert data: ${errorData}`);
          }
      
          const result = await response.json();
          console.log('Data inserted successfully:', result);
        } catch (error) {
          console.error('Error inserting data:', error);
        }
        handleAddBusiness(
          {
            id: data.id,
            name: data.name,
            createdOn: data.createdOn,
            location: data.location,
          }
        )
        setBusinessDate("")
        setBusinessName("")
        setBusinessAddModalIsOpen(false)
      }
     };

    
    return (
        <div 
        onClick={onClose}
        className={`
        inset-0
        fixed
        h-screen  w-screen
        flex justify-center items-center
        transition-all
        ${businessAddModalIsOpen ? 'bg-black/60 visible' : 'invisible'}
      `}>
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`
          h-5/6 
          w-2/3 
          lg:w-2/4
          xl:w-2/5
          2xl:w-1/3
          bg-white
          rounded-lg
          shadow-lg
          transition-all
          ${businessAddModalIsOpen ? 'translate-y-0' : 'translate-y-[900px]'}
          ${businessAddModalIsOpen ? 'scale-100' : 'scale-0'}
          px-6 py-8
        `}>
          <div className="
            flex flex-row justify-between items-center
          ">
            <span className="font-bold text-3xl text-slate-800">Add a Business</span>
            <RxCross2 onClick={onClose} size={30} color='gray' className='cursor-pointer' />
          </div>
          <div className="
            my-5
            w-full
            border-b-2
            border-rose-500
            rounded-full
          "></div>

          <span className="font-bold text-xl text-slate-800">Add Business Information</span>
          <div className="flex flex-col py-4 relative justify-center">
            <input id="businessName"
              onChange={handleBusinessNameChange}
              value={businessName}
              type="text" placeholder=' ' className="
              border-[3px]
              border-rose-500
              rounded-lg
              p-3
              outline-none
              peer
            " />
            <span
              className='
                absolute left-3
              text-gray-500 
              transition-all 
              flex
              bg-white
              peer-focus:-translate-y-6
              peer-placeholder-shown:-translate-y-0
              -translate-y-6
              pointer-events-none
              px-1

              peer-focus:text-xs
              peer-[:not(:placeholder-shown)]:text-xs
              text-md
            '
            >Business Name</span>
          </div>
          <div className="flex flex-col py-4 relative justify-center">
            <input 
              onChange={handleBusinessDateChange}
              value={businessDate}
              type="text" placeholder=' ' className="
              border-[3px]
              border-rose-500
              rounded-lg
              p-3
              outline-none
              peer
            " />
            <span
              className='
                absolute left-3
              text-gray-500 
              transition-all 
              flex
              bg-white
              peer-focus:-translate-y-6
              peer-placeholder-shown:-translate-y-0
              -translate-y-6
              pointer-events-none
              px-1

              peer-focus:text-xs
              peer-[:not(:placeholder-shown)]:text-xs
              text-md
            '
            >Business Organization Date (Year/MM/DD)</span>
          </div>
          
          <span className="font-bold text-xl text-slate-800">Add Business Location</span>
          <div className='overflow-hidden w-full h-2/5 mt-2'>
            <Map currentMarkerPosition={markerCoords} setCurrentMarkerPosition={setMarkerCoords} />
          </div>

          <div className="flex flex-row justify-end items-center my-3 gap-4">
            <button 
              onClick={onClose}
              className="
              px-5
              py-2
              border-rose-500
              border
              text-rose-500
              rounded-md
              font-bold
              text-lg
              hover:border-rose-500/90
              hover:text-rose-500/60
            ">Cancel</button>
            <button 
            onClick={handleSubmit}
            className="
              px-5
              py-2
              bg-rose-500
              text-white
              rounded-md
              font-bold
              text-lg
              hover:bg-rose-500/90
            ">Submit</button>
          </div>

        </div>
      </div>
    )
}

export default BusinessAddModal;