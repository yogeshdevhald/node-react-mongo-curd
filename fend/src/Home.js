import './App.css';
import {useState,useEffect} from 'react'
import EditPopup from './Editpopup.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
//import 'react-paginate/dist/react-paginate.css';


const itemsPerPage = 1;
function Home() {
  const [data,setData] = useState()
  const [sendata,setEdtdata] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
          const response = await fetch(
              `http://localhost:3000/app/fetch?currentPage=${currentPage+1}&itemsPerPage=${itemsPerPage}`
          );
          var json = await response.json();
          //console.log(json);
          setData(json.datae);
          console.log(json.datae.length/ itemsPerPage)
          setTotalPages(Math.ceil(json.datae.length / itemsPerPage));
      } catch (e) {
          console.error(e);
      }
    };
    fetchData()
  }, [currentPage]);

  async function editdata(Editid) {
         try {
          const response = await fetch('http://localhost:3000/app/edit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'id':Editid}),
        });
        if (!response.ok) {
          console.log(`HTTP error! Status: ${response.status}`);
        }
          var json = await response.json();
          setEdtdata(json.datae);
         } catch (e) {
          console.error(e);
      }
  };
const [showModal, setShowModal] = useState();
const [editd,setEdt] = useState();
const openModal = (id) => {
  editdata(id)
  setShowModal(true);
  setEdt(id)
}
const closeModal = () => {
  setShowModal(false);
};
const deleteDAta = (delid) => {
  confirmAlert({
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this item?',
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          try {
            const response = await fetch('http://localhost:3000/app/delete', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({'id':delid}),
          });
          if (!response.ok) {
            console.log(`HTTP error! Status: ${response.status}`);
          }
           
           } catch (e) {
          
        }
        }
      },
      {
        label: 'No',
        onClick: () => {
          // Do nothing or handle the cancellation
          console.log('Cancelled');
        }
      }
    ]
  });
} 
const handlePageChange = ({ selected }) => {
  setCurrentPage(selected);
};
  return (
    <div className="App">
      {data?.map((item) => (
           <p>
            <p>{item.firstName}</p>
            <button onClick={() => openModal(item._id)}>  Edit     </button>
            <button onClick={ ()=> deleteDAta(item._id)  } >Delete  </button>
           </p>
      ))}
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
{sendata?<EditPopup showModal={showModal} closeModal={closeModal} edtd = {sendata}/>:''}
    </div>
  );
}
export default Home;