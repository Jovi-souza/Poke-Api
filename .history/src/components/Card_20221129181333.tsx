import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type PokemonCardProps = {
  name: string
  url: string
}

type PokemonProps = {
  id: number
  name: string
  base_experience: number
  height: number
  order: number
  weight: number
  url: string
  types: []
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState({} as PokemonProps)
  console.log(pokemon)

  useEffect(() => {
    async function getPokemonData() {
      const res = await axios.get(url)
      const data = res.data
      const poke: PokemonProps = {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        order: data.order,
        weight: data.weight,
        url: data.sprites.front_default,
        types: data.types.map((type: {}) => {
          return type
        }),
      }
      setPokemon(poke)
    }
    getPokemonData()
  }, [url])

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="flex flex-col gap-4 px-6 py-4 w-48 items-center justify-center rounded-xl bg-purple-500 text-white font-bold">
          <div className="-mt-12">
            <Image src={pokemon.url} alt="" width={100} height={100} />
          </div>
          <div className="flex gap-4 rounded-lg px-4 py-1 bg-gray-600">
            <span className="text-purple-300">#{pokemon.id}</span>
            <h1>{name}</h1>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed" />
        <Dialog.Content className="flex flex-col justify-center items-center bg-gray-500 rounded-md fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-[70%]">
          <Dialog.Title className="">
            <Image src={pokemon.url} alt="" width={150} height={150} />
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-2 gap-4 justify-center items-center w-1/2 bg-gray-100 ">
            <p>Weight: {pokemon.weight}</p>
            <p className="">Height: {pokemon.height}</p>
            <p>Order: {pokemon.order}</p>
            <p>Base Exp: {pokemon.base_experience}</p>
            {pokemon.types.map(
              (item: { slot: number; type: { name: string } }) => {
                return (
                  <p
                    key={item.slot}
                    className="bg-gray-200 text-gray-700 px-2 rounded"
                  >
                    {item.type.name}
                  </p>
                )
              },
            )}
          </Dialog.Description>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
