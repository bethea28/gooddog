import React from 'react'
import fetch from 'isomorphic-fetch'
import { filterListHelper, FilteredList } from './filterListHelper.jsx'
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
  handleTabClick = (index) => {
    const { unChangedBreedList, pureBreeds, nonLive, crossBreeds } = this.state

    /* eslint-disable no-nested-ternary */
    // logic for filtering breed tabs
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
    const word = event.target.value
    this.setState({ inputValue: word })
  }
  // modal visibility logic based on the input
  modalVisibility = (event) => {
    if (event.target.className === 'app-component__search-input') {
      this.setState({
        showModal: !this.state.showModal,
      })
    }
  }
  render() {
    const { breedTabs, inputValue, showModal, allBreeds } = this.state

    // logic for filtered list functionality that utilizes a helper function
    const finalList = filterListHelper(allBreeds, inputValue)

    return (
      <section className='app-component'>
        <p>
          I have <strong>{finalList?.length}</strong> breeds ready to be
          searched!
        </p>
        <input
          onClick={this.modalVisibility}
          className='app-component__search-input'
          onChange={this.handleOnChange}
          name='input'
          placeholder='Enter a breed, e.g. "Havanese"'
        />
        {showModal && (
          <article className='app-component__modal-container'>
            <div>
              {breedTabs.map((tab, tabIndex) => (
                <button
                  key={tabIndex}
                  name='buttons'
                  className='app-component__tab-buttons'
                  onClick={() => this.handleTabClick(tabIndex)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* <div className='app-component__list-container'>{finalList}</div> */}
            <div className='app-component__list-container'>
              <FilteredList breeds={allBreeds} inputValue={inputValue} />
            </div>
          </article>
        )}
      </section>
    )
  }
}

export default App
