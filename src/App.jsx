import { useEffect, useState } from "react"
import { db } from "./firebaseConfig"
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([])

  const usersCollection = collection(db, "users")

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection)
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getUsers()
  }, [])

  return (
   <main className=" container">
      <ul className=" space-y-4">
        {
          users.map((user) => (
            <li className=" text-center">
              <p className=" text-2xl font-bold">Name: {user.name}</p>
              <p className=" text-2xl font-bold">Age {user.age}</p>
            </li>
          ))
        }
      </ul>
   </main>
  )
}

export default App
