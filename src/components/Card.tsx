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
  abilities: string[]
  types: string[]
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState({} as PokemonProps)
  const { abilities, types } = pokemon

  useEffect(() => {
    async function getPokemonData() {
      const res = await axios.get(url)
      const data = res.data

      const abilities = data.abilities.map(
        (item: { ability: { name: string } }) => {
          return item.ability.name
        },
      )
      const types = data.types.map((item: { type: { name: string } }) => {
        return item.type.name
      })
      console.log(data)

      const poke: PokemonProps = {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        order: data.order,
        weight: data.weight,
        url: data.sprites.front_default,
        abilities,
        types,
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
          <div className="flex gap-2 w-full justify-between rounded-lg px-2 py-1 bg-gray-600">
            <span className="text-purple-300 flex-1">#{pokemon.id}</span>
            <h1 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
              {name}
            </h1>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed" />
        <Dialog.Content className="flex flex-col items-center justify-center gap-8 w-2/3 max-w-md rounded-xl bg-white shadow-2xl border border-gray-500 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
          <Dialog.Title className="flex flex-col gap-4">
            <Image
              alt="image pokemon"
              src={pokemon.url}
              width={150}
              height={100}
            />
            <div className="flex justify-between">
              {types?.map((item) => (
                <div
                  key={item}
                  className="py-2 px-3 text-center text-white bg-blue-600 rounded"
                >
                  {item}
                </div>
              ))}
            </div>
          </Dialog.Title>
          <Dialog.Description className="grid grid-cols-1 gap-2 bg-purple-500 px-14 py-6 w-full h-full rounded-t-3xl sm:grid-cols-2 md:grid-cols-3">
            <div>
              <div className="flex flex-col text-white">
                Height
                <p className="text-gray-300">{pokemon.height}</p>
              </div>
              <div className="flex flex-col text-white">
                Weight
                <p className="text-gray-300">{pokemon.weight}</p>
              </div>
              <div className="flex flex-col text-white">
                Order
                <p className="text-gray-300">{pokemon.order}</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col text-white">
                Base Exp.
                <p className="text-gray-300">{pokemon.base_experience}</p>
              </div>
            </div>
            <div>
              <div>
                <div className="flex flex-col gap-2 text-white">
                  <p className="font-semibold">Abilities</p>
                  {abilities?.map((item) => (
                    <p
                      key={item}
                      className="bg-green-500 px-2 py-1 w-full max-w-[10rem] rounded text-center"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
