import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [realData, setRealData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log("querySnapshot", querySnapshot.docs);
    const data = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    setRealData(data);
  }

  console.log("realData", realData);

  const [searchCollege, setSearchCollege] = useState()

  const handleSearch = () =>{
    const filteredData = realData.filter((item)=>{
      item.college.toLowerCase().includes(searchCollege.toLowerCase())
    })

  }



  return (
    <div className="App">
          <div className="mb-5">
            <input 
            type="text" 
            placeholder="Search for colleges.." 
            />
            <button className="bg-red-500 text-white p-3" onClick={handleSearch}>Search</button>
          </div>
          <table>
            <thead>
              <tr className='bg-black text-white uppercase'>
               <th className="p-2">Name</th>
               <th className="p-2">College</th>
               <th className="p-2">Phone Number</th>
               <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
      {realData.map((user) => (
    
              <tr className='even:bg-slate-200 hover:text-white hover:bg-red-500'>
                     <td className="p-3">{user.name}</td>
                     <td className="p-3">{user.college}</td>
                     <td className="p-3">{user.phNumber}</td>
                     <td className="p-3">{user.email}</td>
              </tr>

      ))}
                  </tbody>
          </table>
    </div>
  );
}

export default App;

