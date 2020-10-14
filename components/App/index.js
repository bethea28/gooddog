import React from 'react'
import fetch from 'isomorphic-fetch'
import './app.scss'

class App extends React.Component {
  state = {
    unChangedBreedList: [],
    inputValue: '',
    allBreeds: [],
    pureBreeds: [],
    crossBreeds: [],
    nonLive: [],
    breedTabs: ['All', 'Purebreed', 'Crossbreed', 'Not Live'],
    showModal: false,
  }
  componentDidMount = async () => {
    let response = await fetch('/api/breeds')
    let data = await response.json()

    let pureBreeds = data?.filter((breed) => {
      return breed.hybrid === false && breed.live === false
    })
    let crossBreeds = data?.filter((breed) => {
      return breed.hybrid === true && breed.live === false
    })
    let nonLive = data?.filter((breed) => {
      return breed.live === false
    })

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
  handleTabClick = (index) => {
    const {
      allBreeds,
      unChangedBreedList,
      pureBreeds,
      nonLive,
      crossBreeds,
    } = this.state

    this.setState({
      allBreeds:
        index === 1
          ? pureBreeds
          : index === 2
          ? crossBreeds
          : index === 3
          ? nonLive
          : unChangedBreedList,
    })
  }
  handleOnChange = (event) => {
    let word = event.target.value
    this.setState({ inputValue: word })
  }
  modalVisibility = (event) => {
    if (event.target.name === 'input') {
      this.setState({ showModal: true })
    } else {
      this.setState({ showModal: false })
    }
  }
  render() {
    const {
      breedTabs,
      unChangedBreedList,
      inputValue,
      showModal,
      allBreeds,
    } = this.state

    let finalList = allBreeds.breed
      ?.filter((a) => {
        return a.name.toLowerCase().includes(inputValue)
      })
      ?.map((b, c) => {
        return (
          <li className='app-component__breed-item' key={c}>
            <img className='app-component__breed-image' src={allBreeds.url} />
            {b.name}
          </li>
        )
      })

    return (
      <div className='app-component'>
        <p>
          I have <strong>{finalList?.length}</strong> breeds ready to be
          searched!
        </p>
        <input
          onClick={this.modalVisibility}
          className='app-component__search-input'
          onChange={this.handleOnChange}
          name='input'
        />
        {showModal && (
          <div className='app-component__modal-container'>
            <div className='app-component__list-container'>
              {breedTabs.map((tab, tabIndex) => {
                return (
                  <button
                    key={tabIndex}
                    name='buttons'
                    className='app-component__tab-buttons'
                    onClick={() => this.handleTabClick(tabIndex)}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
            {finalList}
          </div>
        )}
      </div>
    )
  }
}

export default App
