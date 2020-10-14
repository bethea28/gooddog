import React from 'react';

export const filterList = (breeds, inputValue) => {
  const finalList = breeds?.breed
    ?.filter(a => a.name.toLowerCase().includes(inputValue))
    .map((b, c) => (
      <li className="app-component__breed-item" key={ c }>
        <img alt="" className="app-component__breed-image" src={ breeds.url } />
        { b.name }
      </li>
    ));
  return finalList;
};
