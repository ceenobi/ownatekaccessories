import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  useColorModeValue,
  Text,
  VStack,
  Heading,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { HiMenuAlt2, HiX } from 'react-icons/hi'
import Link from 'next/link'
import { RiShoppingCartLine } from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useRouter } from 'next/router'

import exploreRouterMenu from './navroutes/menuConfig'
import { Cart } from './'
import { useCart } from '../contextHook/useCart'

export default function Navbar({ colorMode, toggleColorMode }) {
  const { showBag, setShowBag, bagItems } = useCart()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [keyword, setKeyword] = useState('')
  const [navbar, setNavbar] = useState(false)
  const router = useRouter()
  const bg = useColorModeValue('pallete.darkBlack', 'pallete.shellWhite')
  const color = useColorModeValue('pallete.lightBg', 'pallete.darkBg')

  const innerBoxStyles = {
    cursor: 'pointer',
  }

  const hoverBoxStyle = {
    position: 'relative',
    transition: 'tranform .4s ease',
    _hover: {
      transform: 'scale(1.1, 1.1)',
    },
  }

  const closeModal = () => {
    if (isOpen) onClose()
  }
  const searchItem = () => {
    if (keyword.trim()) {
      router.push(`/search?keyword=${keyword}`)
    } else {
      router.push('/')
    }
    closeModal()
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchItem()
    }
  }

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  useEffect(() => {
    changeBackground()
    window.addEventListener('scroll', changeBackground)
    return () => {
      window.removeEventListener('scroll', changeBackground)
    }
  })

  return (
    <Box
      top={0}
      zIndex={2}
      p='1rem .5rem'
      w='100%'
      position='fixed'
      className={navbar ? 'navbar active' : 'navbar'}
    >
      <Container maxW='container.lg'>
        <Flex align='center' justify='space-between' sx={innerBoxStyles}>
          <Icon
            as={HiMenuAlt2}
            width={8}
            height={8}
            onClick={isOpen ? onClose : onOpen}
            variant='unstyled'
            color='pallete.lightGold'
          />
          <Drawer
            placement={'top'}
            onClose={onClose}
            isOpen={isOpen}
            size='full'
          >
            <DrawerOverlay />
            <DrawerContent bg={bg} color={color} sx={innerBoxStyles}>
              <DrawerHeader>
                <Flex justify='space-between'>
                  <Icon
                    as={HiX}
                    w={8}
                    h={8}
                    onClick={onClose}
                    color='pallete.lightGold'
                  />
                  <IconButton
                    size='lg'
                    color='pallete.lightGold'
                    border='1px'
                    variant='link'
                    icon={
                      colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />
                    }
                    aria-label={'Change Color Theme'}
                    onClick={toggleColorMode}
                  />
                </Flex>
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={30} mt={2} p={5}>
                  <Heading as='h2' size='lg'>
                    THE VAULT COLLECTION
                  </Heading>
                  {exploreRouterMenu.map((menu) => (
                    <Link href={`/${menu.path}`} key={menu.sectionId}>
                      <Text
                        textStyle='md'
                        textAlign='left'
                        textTransform='uppercase'
                        fontWeight='semibold'
                        transition='all 0.3s ease-in-out'
                        className='navLink'
                        onClick={isOpen ? onClose : onClose}
                      >
                        {menu.sectionLabel}
                      </Text>
                    </Link>
                  ))}
                  <InputGroup
                    size='sm'
                    maxW='300px'
                    borderBottomWidth='1px'
                    borderBottomColor='pallete.lightGold'
                    mt='3rem'
                  >
                    <Input
                      placeholder='What are you looking for?'
                      variant='flushed'
                      color='pallete.lightGold'
                      _placeholder={{ color: 'inherit' }}
                      value={keyword}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => setKeyword(e.target.value)}
                      size='md'
                    />
                    <InputRightElement>
                      <IconButton
                        variant='unstyled'
                        aria-label='Search database'
                        icon={<FaSearch />}
                        type='submit'
                        fontSize='20px'
                        onClick={searchItem}
                      />
                    </InputRightElement>
                  </InputGroup>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
          <Link href='/'>
            <Heading as='h3' color='pallete.lightGold'>
              OWNATEK
            </Heading>
          </Link>
          <Box sx={hoverBoxStyle} onClick={() => setShowBag(true)}>
            <Icon
              as={RiShoppingCartLine}
              boxSize='30px'
              color='pallete.lightGold'
            />
            <Badge
              bg='teal.500'
              position='absolute'
              right='-7px'
              borderRadius='xl'
              variant='solid'
            >
              {bagItems.length}
            </Badge>
          </Box>
        </Flex>
      </Container>
      {showBag && <Cart />}
    </Box>
  )
}
