"use client";
import { api } from '../convex/_generated/api';
import { useStackApp, useUser } from '@stackframe/stack'
import { useMutation } from 'convex/react';
import { useEffect, useState } from 'react';
import React from 'react'
import {UserDetailContext} from "../context/UserDetailContext";
function Provider({children}) {
  const user=useUser();
  const createNewUserMutation=useMutation(api.users.CreatedNewUser);
  const [userDetail,setUserDetail]=useState(null);
  useEffect(()=>{
    console.log(user);
    user&&CreateUser();
  },[user])
  const CreateUser=async ()=>{
    const data={
        name:user?.displayName,
        email:user?.primaryEmail,
        picture:user?.profileImageUrl
    }
    const result=await createNewUserMutation({
        ...data
    });
    console.log(result);
    setUserDetail(result);
  }
  return (
    <div>
        <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
        {children}
        </UserDetailContext.Provider>
    </div>
  )
}

export default Provider