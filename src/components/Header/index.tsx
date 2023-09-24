import * as React from 'react'

import { alpha, styled } from '@mui/material/styles'

import BaseAppBar from '@mui/material/AppBar'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SwitcheTheme from '../SwitchTheme'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useCart from '@/hooks/useCart'
import { Tooltip } from '@mui/material'
import Image from 'next/image'
import logoText from '@/assets/img/logo-text.png'

const AppBar = styled(BaseAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.white, 0.9),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.25) : theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  display: 'none',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    display: 'flex',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    minWidth: '400px',
  },
  borderRadius: 5,
}))

const SearchMobile = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.white, 0.9),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.25) : theme.palette.common.white,
  },
  display: 'flex',
  marginLeft: 0,
  width: '100%',
  borderRadius: 5,
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))
interface Props {
  onInputChange: (text: string) => void
}

export default function Header({ onInputChange }: Props) {
  const { cartQuantity, cleanCart } = useCart()

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeoutId = setTimeout(() => {
      onInputChange(event.target.value)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Box>
          <SwitcheTheme />
        </Box>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'block', flexDirection: 'column' }}>
          <Box py={2} flex={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box display={'flex'} gap={1} alignItems={'baseline'}>
              <Image src={logoText} height={40} width={65} alt='Logo da Ada tech' />
              <Typography
                variant="h6"
                noWrap
                component="h1"
                color="primary"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Ecommerce
              </Typography>
            </Box>


            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar produtos..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInput}
              />
            </Search>

            <Box display={'flex'} alignItems={'center'}>
              <Box sx={{ flexGrow: 1 }} />
              <Box>
                <Tooltip title="Limpar carrinho">
                  <IconButton onClick={cleanCart} sx={{ color: '#FFFFFF' }}>
                    <AssignmentTurnedInIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box>
                <Tooltip title="Ver carrinho">
                  <IconButton size="large" sx={{ color: '#FFFFFF' }}>
                    <Badge badgeContent={cartQuantity} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, color: '#FFFFFF' }}>
                <IconButton
                  size="large"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <SwitcheTheme />
              </Box>
            </Box>

          </Box>

          <Box pb={2} sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <SearchMobile>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar produtos..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleInput}
              />
            </SearchMobile>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  )
}
