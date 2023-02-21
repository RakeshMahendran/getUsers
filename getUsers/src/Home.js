import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { db } from './firebase';

function Home() {
    const [data,setData] = useState()
   
   const ref = collection(db,'users')

  useEffect(() => {
    // const unsubscribe = ref.onSnapshot((snapshot) => {
    //   setData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    // });

    // return () => unsubscribe();
    getdata()
    
  }, []);

  async function getdata(){
    getDocs(ref).then((snapshot) => {
      console.log(snapshot.docs());
    })
  }

  return (
    <div>Home</div>
  )
}

export default Home