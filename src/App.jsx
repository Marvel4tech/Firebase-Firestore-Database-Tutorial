import { useEffect, useState } from "react"
import { db } from "./firebaseConfig"
import { collection, getDocs } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([])
  const [newAge, setNewAge] = useState('')
  const [newName, setNewName] = useState('')

  const usersCollection = collection(db, "users")

  const handleCreateUser = async () => {

  }

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
      <div>
        <form onSubmit={handleCreateUser} className=" space-y-2">
          <input className=" border p-2 rounded-lg" type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
          <input className=" border p-2 rounded-lg" type="number" placeholder="Enter age" on/>
          <div>
            <button className=" btn" type="submit">Create User</button>
          </div>
        </form>
      </div>
   </main>
  )
}

export default App
