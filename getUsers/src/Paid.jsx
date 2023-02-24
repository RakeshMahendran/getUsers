import React, { useEffect, useState } from 'react'

function Paid() {
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
  return (
    <div>
        
        {realData.map((data)=>{
           console.log('data',data)
        })}
    </div>
  )
}

export default Paid