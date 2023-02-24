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
       return item.college.toLowerCase().includes(searchCollege.toLowerCase())
    })
    setRealData(filteredData)
    setSearchCollege('')
  }

   

  return (
    <div className="App">
          <div className="mb-5">
            <input 
            type="text" 
            placeholder="Search for colleges.." 
            value={searchCollege}
            onChange={(event)=>{
              setSearchCollege(event.target.value)
            }
            }
            />
            <button className="bg-red-500 text-white p-3" onClick={handleSearch}>Search</button>
          </div>
          <table>
            <thead>
              <tr className='bg-black text-white uppercase'>
               <th className="p-2">Index</th>
               <th className="p-2">Name</th>
               <th className="p-2">College</th>
               <th className="p-2">Phone Number</th>
               <th className="p-2">Email</th>
              </tr>
            </thead>
            <tbody>
      {realData.map((user,index) => (
              <tr className='even:bg-slate-200 hover:text-white hover:bg-red-500'>
                     <td className='p-3'>{index+1}</td>
                     <td className="p-3">{user.name}</td>
                     <td className="p-3">{user.college}</td>
                     <td className="p-3">{user.phNumber}</td>
                     <td className="p-3">{user.email}</td>
              </tr>

      ))}
                  </tbody>
          </table>

          <div className=' mt-[100px]'>
            <div className=' text-6xl font-bold'>
              Paid
            </div>
            {realData.map((data,i)=>{
              console.log('data',data)
              const filter = data?.image ? (
                <div key={i} className=' p-5 hover:bg-gray-100'>
                  <div className=' grid grid-flow-row grid-cols-4 '>
                     {/* <div className='p-3'>{index+1}</div> */}
                     <div className="p-3">{data?.name}</div>
                     <div className="p-3">{data?.college}</div>
                     <div className="p-3">{data?.phNumber}</div>
                     <div className="p-3">{data?.email}</div>
                    
                  </div>
                  {data?.image.map((img,i)=>(
                      <div key={i} className=''><a href={img} target='_blank' className=' max-w-7xl text-black hover:text-green-500'>{img}</a></div>
                     ))}
                </div>
              ):null

              return (
                <div >{filter}</div>
              )
            })}
          </div>
    </div>
  );
}

export default App;

{/* <thead>
                        <tr className='bg-black text-white uppercase'>
                        <th className="p-2">Index</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">College</th>
                        <th className="p-2">Phone Number</th>
                        <th className="p-2">Email</th>
                        </tr>
                    </thead>
                    <tr className='even:bg-slate-200 hover:text-white hover:bg-red-500'>
                      <td className='p-3'>{index+1}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.college}</td>
                      <td className="p-3">{user.phNumber}</td>
                      <td className="p-3">{user.email}</td>
                  </tr> */}