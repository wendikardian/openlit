import React from 'react'
import ReusableHeader from '../components/ReusableHeader'
import { Button, Image } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from '../../data'
import { useNavigate } from 'react-router-dom'


export default function EnrollClass() {
  return (
    <div>
        <ReusableHeader />
    </div>
  )
}
