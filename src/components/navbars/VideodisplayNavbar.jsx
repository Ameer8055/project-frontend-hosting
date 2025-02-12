import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const VideodisplayNavbar = () => {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='bg-transparent shadow-none'>
        <Toolbar>
        <img src="/Images/video-editing-app.png" alt="" style={{width:'50px'}} className='mt-2 me-3' />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className='mt-3'>
            CINESTREAM
          </Typography>
          <Link to={'/viewerhome'}><Button color="inherit">Go Back</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default VideodisplayNavbar