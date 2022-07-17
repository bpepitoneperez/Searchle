// You need to install React/React-DOM
import { Fireworks } from 'fireworks/lib/react'

const FireworksComponent = ({showFireworks}) => {
  let fxProps = {
    count: 1,
    interval: 1500,
    colors: ['#faa622', '#ffe52c', '#7fe6ef', '#c4d70c', '#c22303'],
    canvasWidth: 600,
    canvasHeight: 800,
    calc: (props, i) => ({
      ...props,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 100
    })
  }
  if (showFireworks)
  {
    return (
        <div style={{width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
          }}
        >
            <Fireworks {...fxProps} />
        </div>
    )
  }
    
  return <></>;
}

export default FireworksComponent