/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from 'react';

const tempData = [
  {name: 'Carlos Santana', id: 1, edad: 19, authorize: true, images:[] as string[]},
  {name: 'Mamá', id: 2, edad: 40, authorize: true, images:[] as string[]},
  {name: 'Tio Carlos', id: 3, edad: 49, authorize: true, images:[] as string[]},
  {name: 'Ex', id: 4, edad: 19, authorize: false, images:[] as string[]}
];

export const ListPeopleContext = createContext({
    listPeople: tempData,
    setListPeople: (setting?:any) => {}
});

export const ListPeopleProvider = ({ children }: { children: JSX.Element }) => {
    const [listPeople, setListPeople] = useState(tempData);
    return (
        <ListPeopleContext.Provider value={{
            listPeople,
            setListPeople
        }}>
            { children }
        </ListPeopleContext.Provider>
    );
};
