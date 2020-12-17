import React from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

export const filterListHelper = (breeds, inputValue) => {
  const finalList = breeds?.breed
    ?.filter((a) => a.name.toLowerCase().includes(inputValue))
    .map((b, c) => (
      <li name='item' className='app-component__breed-item' key={c}>
        <img alt='' className='app-component__breed-image' src={breeds.url} />
        {b.name}
      </li>
    ))
  return finalList
}

// export const FilteredList = ({ breeds, inputValue }) => {
//   // console.log('filterd', breeds)
//   // console.log('input', inputValue)

//   const finalList = breeds?.breed
//     ?.filter((a) => a.name.toLowerCase().includes(inputValue))
//     .map((b, c) => (
//       <li name='item' className='app-component__breed-item' key={c}>
//         <img alt='' className='app-component__breed-image' src={breeds.url} />
//         {b.name}
//       </li>
//     ))
//   return finalList
// }

export const FilteredList = ({ breeds, inputValue }) =>
  console.log('hey', inputValue) || (
    <>
      {breeds?.breed
        .filter((a) => {
          return a.name.toLowerCase().includes(inputValue)
        })
        .map((b, c) => {
          return (
            <li name='item' className='app-component__breed-item' key={c}>
              <img
                alt=''
                className='app-component__breed-image'
                src={breeds.url}
              />
              {b.name}
            </li>
          )
        })}
    </>
  )

export const HigherOrderComponent = (WrappedComponent) => {
  class ParentComponent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        unChangedBreedList: [],
        inputValue: '',
        allBreeds: [],
        pureBreeds: [],
        crossBreeds: [],
        nonLive: [],
        breedTabs: ['All', 'Purebreed', 'Crossbreed', 'Not Live'],
        showModal: false,
      }
    }
    componentDidMount = async () => {
      const response = await fetch('/api/breeds')
      const data = await response.json()

      // logic that creates the different tab groups
      const pureBreeds = data?.filter(
        (breed) => breed.hybrid === false && breed.live === false
      )
      const crossBreeds = data?.filter(
        (breed) => breed.hybrid === true && breed.live === false
      )
      const nonLive = data?.filter((breed) => breed.live === false)

      this.setState({
        unChangedBreedList: {
          breed: data,
          url:
            'https://d3requdwnyz98t.cloudfront.net/assets/pages/index/breeds/pomeranian-f55614cfe174bb5abd71eaaba4517ba275dfc8dc5d43aa8b0c3fcc9c8a26655d.jpg',
        },
        allBreeds: {
          breed: data,
          url:
            'https://d3requdwnyz98t.cloudfront.net/assets/pages/index/breeds/pomeranian-f55614cfe174bb5abd71eaaba4517ba275dfc8dc5d43aa8b0c3fcc9c8a26655d.jpg',
        },
        pureBreeds: {
          breed: pureBreeds,
          url:
            'https://d3requdwnyz98t.cloudfront.net/assets/pages/index/breeds/bichon-frise-d4704af96a9aaa7b7fdeeaa1ad158546bba0581e944713da0f6634ccbe2704bf.jpg',
        },
        crossBreeds: {
          breed: crossBreeds,
          url:
            'https://d3requdwnyz98t.cloudfront.net/assets/pages/index/breeds/poodle-3c33b6367ce0fc252e2a8681243320ae090bbb00bac8a48d057c82308d5f5259.jpg',
        },
        nonLive: {
          breed: nonLive,
          url:
            'https://d3requdwnyz98t.cloudfront.net/assets/pages/index/breeds/shih-tzu-7360b4f77663ac7706c83dd6e4a4206550d4281f0929453d57e62268b32ac67b.jpg',
        },
      })
    }
    render() {
      return (
        <div>
          <p> THIS IS TEXT FROM HOC COMPONENT</p>
          <WrappedComponent {...this.props} hocState={this.state} />
        </div>
      )
    }
  }
  return hoistNonReactStatic(ParentComponent, WrappedComponent)
}
