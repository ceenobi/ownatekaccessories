import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const customTheme = extendTheme(
  {
    colors: {
      pallete: {
        lightBg: '#FCF7F4',
        darkBg: '#4A4A4A',
        lightGold: '#c2a083',
        darkBlack: '#050206',
        lightGrey: '#dcdcdc',
        lightWhite: '#faf9f6',
        shellWhite: '#eae7e0',
      },
    },
    fonts: {
      heading: `'Red Hat Display', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
    textStyles: {
      h1: {
        fontSize: ['46px', '60px', '65px'],
        letterSpacing: '0.04em',
        fontFamily: 'Red Hat Display',
        lineHeight: '100%',
        fontWeight: 'extrabold',
      },
      h2: {
        letterSpacing: '0.04em',
        fontSize: ['30px', '40px'],
        fontFamily: 'Red Hat Display',
        fontWeight: 'extrabold',
      },
      p: {
        letterSpacing: '0.04em',
        fontSize: ['14px', '16px'],
        fontFamily: 'Poppins',
        textDecoration: 'none',
        lineHeight: '1.3',
        _hover: {
          textDecoration: 'none',
        },
      },
      sm: {
        letterSpacing: '0.04em',
        fontSize: '12px',
        fontFamily: 'Poppins',
        lineHeight: '1.3',
      },
      md: {
        letterSpacing: '0.04em',
        fontSize: '20px',
        fontFamily: 'Poppins',
        lineHeight: '1.3',
      },
    },
    components: {
      Card: {
        baseStyle: {
          display: 'flex',
          flexDirection: 'column',
          w: { base: '100%', xl: '250px', '2xl': '280px' },
          alignItems: 'center',
          border: '1px solid transparent',
          transform: 'scale(1, 1)',
          transition: 'all 0.5s ease-in-out',
          bg: 'pallete.lightBg',
          border: '1px solid #FCF7F4',
          color: 'pallete.darkBg',
          textAlign: 'center',
          gap: 6,
          _hover: {
            textDecoration: 'none',
            boxShadow: 'base',
          },
        },
        variants: {
          rounded: {
            padding: 3,
            borderRadius: 'xl',
            boxShadow: 'xl',
          },
          smooth: {
            padding: 2,
            borderRadius: 'base',
            boxShadow: 'md',
            w: { base: '100%', xl: '230px', '2xl': '230px' },
          },
        },
        defaultProps: {
          variant: 'smooth',
        },
      },
      Button: {
        baseStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase',
          borderRadius: 'base',
          transform: 'scale(1, 1)',
          transition: 'transform 0.5s ease',
        },
        sizes: {
          xl: {
            h: '46px',
            w: '200px',
            fontSize: 'lg',
            px: '32px',
          },
        },
        variants: {
          'with-shadow': {
            bg: 'pallete.lightGold',
            boxShadow: 'xl',
            _hover: { transform: 'scale(1.1, 1.1)' },
          },
          smooth: {
            bg: 'pallete.darkBg',
            color: 'pallete.lightBg',
            boxShadow: 'xl',
            _hover: { transform: 'scale(1.1, 1.1)' },
          },
        },
      },
    },
    styles: {
      global: (props) => ({
        'html, body': {
          fontSize: 'sm',
          p: 0,
          m: 0,
          color:
            props.colorMode === 'dark' ? 'pallete.darkBg' : 'pallete.lightBg',
          bg:
            props.colorMode === 'dark'
              ? 'pallete.shellWhite'
              : 'pallete.darkBlack',
          lineHeight: 'tall',
        },
        '.swiper': {
          W: '100%',
          h: '100%',
        },
        '.swiper-slide': {
          webkitboxSizing: 'border-box',
          boxSizing: 'border-box',
          fontSize: '18px',
          color: '#fff',
        },
        '.navLink': {
          transition: 'all 0.3s ease',
          _hover: {
            color: 'pallete.lightGold',
            borderBottom: '4px solid #4A4A4A',
          },
        },
        '.marquee': {
          position: 'relative',
          height: '400px',
          width: '100%',
          overflowX: 'hidden',
        },
        '.track': {
          position: 'absolute',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          animation: 'marquee 15s linear infinite',
          width: '300%',
          _hover: {
            animationPlayState: 'paused',
          },
        },
        '@keyframes marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        '.small-image': {
          borderRadius: 'sm',
          bgColor: '#ebebeb',
          boxSize: '70px',
          cursor: 'pointer',
        },
        '.selected-image': {
          bgColor: 'pallete.lightGold',
        },
        '.img-scale': {
          _hover: { transform: 'scale(1.1,1.1)' },
          transition: 'transform 0.5s ease',
        },
        '.navbar.active': {
          bg: 'rgba(255,255,255,0.25)',
          backdropFilter: 'auto',
          backdropBlur: '2xl',
          transition: 'transform 0.2s ease',
        },
      }),
    },
  },
  { config },
  { breakpoints }
)
export default customTheme
