export let test = (breeds) => {
  let finalList = breeds?.breed
    ?.filter((a) => {
      return a.name.toLowerCase().includes(inputValue)
    })
    .map((b, c) => {
      return (
        <li className='app-component__breed-item' key={c}>
          <img className='app-component__breed-image' src={allBreeds.url} />
          {b.name}
        </li>
      )
    })
  return finalList
}
