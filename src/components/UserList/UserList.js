import React from 'react'

// Component to show fetched users list from DB -- Componente para exibir a lista de usuários da DB 
export default function UserList(props) {
    return (
        <div className='userList'>
            <h1>Users List</h1>
            <ul>
                {
                    props.users.map(user => {
                        return (
                            <li key={user._id}>{user.name}</li>                            
                        )
                    })

                }
            </ul>
        </div>
    )
}
