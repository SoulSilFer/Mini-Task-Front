import React from 'react'
import { Box } from '@mui/material'

type LogoProps = {
  sx?: object
}

const Logo: React.FC<LogoProps> = ({ sx }) => {
  return (
    <Box
      component="img"
      src="/static/twitter_header_photo_2.png"
      sx={{ height: 80, ...sx }}
    />
  )
}

export default Logo
