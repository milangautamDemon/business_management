import { useState, useEffect } from 'react'
import BusinessAddModal from './components/BusinessAddModal';
import { GoPlus } from 'react-icons/go';
import BusinessListItem from './components/BusinessListItem';
import BusinessMapViewModal from './components/BusinessMapViewModal';


function App() {

  const [ businessAddModalIsOpen, setBusinessAddModalIsOpen ] = useState(false);
  const [ businessMapViewModalIsOpen, setBusinessMapViewModalIsOpen] = useState(false);
  const [ currentViewingBusiness, setCurrentViewingBusiness ] = useState(null);
  
  const [ business, setBusiness ] = useState([]);

  const fetchdatas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/datas');
      const data = await response.json();
      setBusiness(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
      fetchdatas();
  }, []); 

  const handleAddBusiness = (newBusiness) => {
    setBusiness([
      ...business,
      newBusiness
    ])
  } 

  const handleDeleteBusiness = (bid) => {
    setBusiness(
      business.filter(bs => bs.id !== bid)
    );
  }

  const handleSelectViewBusiness = (business) => {
    setCurrentViewingBusiness(business);
    setBusinessMapViewModalIsOpen(true);
  }

  return (
    <div className="w-screen h-screen">
      <div className="
          h-screen w-screen 
          flex justify-center items-center 
          bg-[url('./images/bg_pattern.png')] bg-center bg-contain
      ">
        <div className="h-5/6 w-2/3 bg-white shadow-lg rounded-xl flex flex-col p-10 pt-0 overflow-auto">
          <div className="header bg-white sticky top-0 py-4 border-b-2 border-solid border-gray-200 shadow-sm">
            <span className="text-4xl font-bold">Dashboard</span>
            <div className="border-2 border-rose-500 my-3 rounded-lg"></div>
            <div className="flex justify-end ">
              <button 
                onClick={() => setBusinessAddModalIsOpen(true)}
                className="
                bg-rose-500 
                  px-4 py-2 
                  font-bold text-white 
                  rounded-lg
                  flex gap-2 items-center
                ">
                Add Business
                <GoPlus size={30}/>
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-5">
            {
              business.map(bs => <BusinessListItem key={bs.id} business={bs} deleteHandler={handleDeleteBusiness} viewBusinessHandler={handleSelectViewBusiness} />)
            }
          </div>
        </div>
      </div>
      <BusinessAddModal 
        businessAddModalIsOpen={businessAddModalIsOpen}
        setBusinessAddModalIsOpen={setBusinessAddModalIsOpen}
        handleAddBusiness={handleAddBusiness}
      />
      <BusinessMapViewModal 
        business={currentViewingBusiness}
        businessMapViewModalIsOpen={businessMapViewModalIsOpen}
        setBusinessMapViewModalIsOpen={setBusinessMapViewModalIsOpen}
      />
    </div>
  );
}

export default App
