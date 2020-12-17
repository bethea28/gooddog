import React from 'react'
import fetch from 'isomorphic-fetch'
import {
  filterListHelper,
  FilteredList,
  HigherOrderComponent,
} from './filterListHelper.jsx'
import './app.scss'

class App extends React.Component {
  state = {
    inputValue: '',
    allBreeds: this.props.unChangedBreedList,
  }

  handleTabClick = (index) => {
    console.log('ind', this.props.hocState)
    const {
      hocState: { unChangedBreedList, pureBreeds, nonLive, crossBreeds },
    } = this.props

    /* eslint-disable no-nested-ternary */
    // logic for filtering breed tabs
    this.setState(
      {
        allBreeds:
          index === 1
            ? this.props.hocState.pureBreeds
            : index === 2
            ? this.props.hocState.crossBreeds
            : index === 3
            ? this.props.hocState.nonLive
            : this.props.hocState.unChangedBreedList,
      },
      () => console.log('try this', this.state)
    )
  }

  handleOnChange = (event) => {
    const word = event.target.value
    this.setState({ inputValue: word })
  }

  // modal visibility logic based on the input
  modalVisibility = (event) => {
    console.log('test')
    if (event.target.className === 'app-component__search-input') {
      this.setState((prev) => ({
        showModal: !prev.showModal,
      }))
    }
  }

  render() {
    const {
      hocState: { breedTabs },
    } = this.props
    let breedLength = this.state.allBreeds?.breed?.length
    console.log('state bryan', this.state.allBreeds)
    return (
      <section className='app-component'>
        <p>
          I have <strong>{breedLength}</strong> breeds ready to be searched!
        </p>
        <input
          onClick={this.modalVisibility}
          className='app-component__search-input'
          onChange={this.handleOnChange}
          name='input'
          placeholder='Enter a breed, e.g. "Havanese"'
        />
        {this.state.showModal && (
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
            {
              <div className='app-component__list-container'>
                <FilteredList
                  breeds={this.state.allBreeds}
                  inputValue={this.state.inputValue}
                />
              </div>
            }
          </article>
        )}
      </section>
    )
  }
}
export default HigherOrderComponent(App)
