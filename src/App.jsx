import { useEffect, useState } from "react"
import { db } from "./firebaseConfig"
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([])
  const [newAge, setNewAge] = useState(0)
  const [newName, setNewName] = useState('')
  const [surname, setSurname] = useState('')

  const usersCollection = collection(db, "users")

  const handleDeleteUser = async (id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  const handleAgeIncrease = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try{
      await addDoc(usersCollection, {name: newName, age: Number(newAge), surname: surname})
      alert('successful')
      setNewAge(0)
      setNewName('')
      setSurname('')
    } catch (error) {
      alert('connection failed')
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollection)
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getUsers()
  }, [usersCollection, db])

  return (
   <main className=" container">
      <ul className=" space-y-4">
        {
          users.map((user) => (
            <li key={user.id} className=" text-center">
              <p className=" text-2xl font-bold">Name: {user.name}</p>
              <p className=" text-2xl font-bold">Age {user.age}</p>
             <div className=" space-x-2">
                <button onClick={() => handleAgeIncrease(user.id, user.age)} className=" btn bg-green-500">Increase Age</button>
                <button onClick={() => handleDeleteUser(user.id)} className=" btn bg-red-600">Delete</button>
             </div>
            </li>
          ))
        }
      </ul>
      <div>
        <form onSubmit={handleCreateUser} className=" space-y-2">
          <input className=" border p-2 rounded-lg" type="text" placeholder="Enter name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <input className=" border p-2 rounded-lg" type="number" placeholder="Enter age" value={newAge} onChange={(e) => setNewAge(e.target.value)}/>
          <input className=" border p-2 rounded-lg" type="text" placeholder="Enter surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
          <div>
            <button className=" btn" type="submit">Create User</button>
          </div>
        </form>
      </div>
   </main>
  )
}

export default App
