"use client"

import React from 'react'
import Ajao from '../../components/Dashboard/firstBox.jsx';
import Users from '../../components/Dashboard/users.jsx';
import Pages from '../../components/Dashboard/FBpages.jsx';

export default function page() {
  return (
    <div  sx={{width:'100%',border:'2px solid red'}}>
      <Ajao />
      <Pages />
      <Users />
    </div>
  )
}
