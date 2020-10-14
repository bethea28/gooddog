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
    // const {
    //   allBreeds,
    //   unChangedBreedList,
    //   pureBreeds,
    //   nonLive,
    //   crossBreeds,
    // } = this.state

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

    console.log('NON', nonLive)
    this.setState({
      unChangedBreedList: data,
      allBreeds: data,
      pureBreeds,
      nonLive,
      crossBreeds,
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
    console.log('test', index)

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

    console.log('searc', word)
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
    console.log('breedlist', this.state)
    // let done = unChangedBreedList.map((a) => {
    //   return a.name
    // })
    // console.log('ALL', allBreeds)
    let finalList = this.state.allBreeds
      ?.filter((a) => {
        return a.name.toLowerCase().includes(inputValue)
      })
      ?.map((b, c) => {
        return (
          <li className='app-component__breed-item' key={c}>
            <img
              className='app-component__breed-image'
              // src={unChangedBreedList.url}
            />
            {b.name}
          </li>
        )
      })

    return (
      <div className='app-component'>
        <p>I have {allBreeds.length} breeds ready to be searched!</p>
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
